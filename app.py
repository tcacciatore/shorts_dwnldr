import json
import os
import re
import shutil
import tempfile
import threading

import yt_dlp
from flask import Flask, after_this_request, jsonify, redirect, render_template, request, send_file, session, url_for
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", os.urandom(24))

SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]

def _get_client_config() -> dict:
    raw = os.environ.get("GOOGLE_CLIENT_SECRETS")
    if raw:
        return json.loads(raw)
    path = os.path.join(os.path.dirname(__file__), "client_secrets.json")
    with open(path) as f:
        return json.load(f)


def detect_platform(url: str):
    url = url.strip()
    if re.search(r"(youtube\.com|youtu\.be)", url):
        return "youtube"
    if re.search(r"instagram\.com", url):
        return "instagram"
    if re.search(r"tiktok\.com", url):
        return "tiktok"
    if re.search(r"(facebook\.com|fb\.watch)", url):
        return "facebook"
    if re.search(r"linkedin\.com", url):
        return "linkedin"
    if re.search(r"(twitter\.com|x\.com)", url):
        return "twitter"
    if re.search(r"reddit\.com", url):
        return "reddit"
    if re.search(r"vimeo\.com", url):
        return "vimeo"
    if re.search(r"dailymotion\.com", url):
        return "dailymotion"
    if re.search(r"twitch\.tv", url):
        return "twitch"
    return None


def _delayed_cleanup(path: str) -> None:
    def _do():
        shutil.rmtree(path, ignore_errors=True)
    threading.Timer(10.0, _do).start()


# ── YouTube via pytubefix ────────────────────────────────────────────────────

def _yt_info(url: str) -> dict:
    from pytubefix import YouTube
    yt = YouTube(url)
    stream = yt.streams.filter(progressive=True, file_extension="mp4") \
                       .order_by("resolution").last()
    return {
        "platform": "youtube",
        "title": yt.title or "Sans titre",
        "thumbnail": yt.thumbnail_url or "",
        "duration": yt.length or 0,
        "uploader": yt.author or "",
    }


def _yt_download(url: str, tmpdir: str) -> str:
    from pytubefix import YouTube
    yt = YouTube(url)
    # Préférer la meilleure qualité progressive (audio+vidéo dans un seul fichier)
    stream = yt.streams.filter(progressive=True, file_extension="mp4") \
                       .order_by("resolution").last()
    if not stream:
        # Fallback : n'importe quel mp4
        stream = yt.streams.filter(file_extension="mp4").order_by("resolution").last()
    if not stream:
        raise RuntimeError("Aucun flux MP4 disponible pour cette vidéo.")
    path = stream.download(output_path=tmpdir)
    # S'assurer que l'extension est .mp4
    if not path.endswith(".mp4"):
        new_path = os.path.splitext(path)[0] + ".mp4"
        os.rename(path, new_path)
        path = new_path
    return path


# ── Instagram / TikTok via yt-dlp ────────────────────────────────────────────

def _ydl_opts(extra: dict = {}) -> dict:
    opts = {
        "quiet": True,
        "no_warnings": True,
        "source_address": "0.0.0.0",
        **extra,
    }
    # En local, on peut utiliser les cookies Chrome pour les sites qui requièrent une auth
    if os.environ.get("USE_BROWSER_COOKIES", "").lower() == "1":
        opts["cookiesfrombrowser"] = ("chrome",)
    return opts


def _ydl_info(url: str) -> dict:
    with yt_dlp.YoutubeDL(_ydl_opts({"skip_download": True})) as ydl:
        info = ydl.extract_info(url, download=False)
    return {
        "platform": detect_platform(url),
        "title": info.get("title") or "Sans titre",
        "thumbnail": info.get("thumbnail") or "",
        "duration": info.get("duration") or 0,
        "uploader": info.get("uploader") or info.get("channel") or "",
    }


def _ydl_download(url: str, tmpdir: str) -> str:
    opts = _ydl_opts({
        "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "outtmpl": os.path.join(tmpdir, "%(title).100s.%(ext)s"),
        "merge_output_format": "mp4",
    })
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(url, download=True)
        path = ydl.prepare_filename(info)

    if not os.path.exists(path):
        path = os.path.splitext(path)[0] + ".mp4"
    if not os.path.exists(path):
        files = [f for f in os.listdir(tmpdir) if f.endswith(".mp4")]
        if not files:
            raise FileNotFoundError("Fichier MP4 introuvable.")
        path = os.path.join(tmpdir, files[0])
    return path


# ── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/info", methods=["POST"])
def api_info():
    data = request.get_json(silent=True) or {}
    url = data.get("url", "").strip()

    platform = detect_platform(url)
    if not platform:
        return jsonify({"error": "URL non reconnue. Seuls YouTube Shorts, Instagram Reels et TikTok sont supportés."}), 400

    try:
        result = _yt_info(url) if platform == "youtube" else _ydl_info(url)
        return jsonify(result)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/download")
def api_download():
    url = request.args.get("url", "").strip()

    platform = detect_platform(url)
    if not platform:
        return jsonify({"error": "URL non reconnue."}), 400

    tmpdir = tempfile.mkdtemp()
    try:
        path = _yt_download(url, tmpdir) if platform == "youtube" else _ydl_download(url, tmpdir)

        @after_this_request
        def cleanup(response):
            _delayed_cleanup(tmpdir)
            return response

        return send_file(path, as_attachment=True,
                         download_name=os.path.basename(path), mimetype="video/mp4")
    except Exception as exc:
        shutil.rmtree(tmpdir, ignore_errors=True)
        return jsonify({"error": str(exc)}), 500


# ── Auth YouTube ─────────────────────────────────────────────────────────────

@app.route("/auth/login")
def auth_login():
    flow = Flow.from_client_config(_get_client_config(), scopes=SCOPES,
                                         redirect_uri=url_for("auth_callback", _external=True))
    auth_url, state = flow.authorization_url(prompt="consent")
    session["oauth_state"] = state
    return redirect(auth_url)


@app.route("/auth/callback")
def auth_callback():
    flow = Flow.from_client_config(_get_client_config(), scopes=SCOPES,
                                         state=session["oauth_state"],
                                         redirect_uri=url_for("auth_callback", _external=True))
    flow.fetch_token(authorization_response=request.url)
    creds = flow.credentials
    session["yt_token"] = {
        "token":         creds.token,
        "refresh_token": creds.refresh_token,
        "token_uri":     creds.token_uri,
        "client_id":     creds.client_id,
        "client_secret": creds.client_secret,
        "scopes":        creds.scopes,
    }
    return redirect(url_for("index"))


@app.route("/auth/status")
def auth_status():
    return jsonify({"connected": "yt_token" in session})


@app.route("/auth/logout")
def auth_logout():
    session.pop("yt_token", None)
    return jsonify({"ok": True})


# ── Upload YouTube ────────────────────────────────────────────────────────────

@app.route("/api/republish", methods=["POST"])
def api_republish():
    if "yt_token" not in session:
        return jsonify({"error": "Non connecté à YouTube."}), 401

    data = request.get_json(silent=True) or {}
    url = data.get("url", "").strip()
    title = data.get("title", "Vidéo republiée")
    description = data.get("description", "")

    platform = detect_platform(url)
    if not platform:
        return jsonify({"error": "URL non reconnue."}), 400

    tmpdir = tempfile.mkdtemp()
    try:
        path = _yt_download(url, tmpdir) if platform == "youtube" else _ydl_download(url, tmpdir)

        from google.oauth2.credentials import Credentials
        creds = Credentials(**session["yt_token"])
        youtube = build("youtube", "v3", credentials=creds)

        body = {
            "snippet": {
                "title": title[:100],
                "description": description,
                "categoryId": "22",
            },
            "status": {"privacyStatus": "private"},
        }
        media = MediaFileUpload(path, mimetype="video/mp4", resumable=True)
        insert_request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

        response = None
        while response is None:
            _, response = insert_request.next_chunk()

        return jsonify({"ok": True, "video_id": response["id"],
                        "url": f"https://www.youtube.com/watch?v={response['id']}"})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500
    finally:
        _delayed_cleanup(tmpdir)


if __name__ == "__main__":
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=False, port=port)
