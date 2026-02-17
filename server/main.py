import httpx
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
import urllib.parse
from pathlib import Path
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

# --- 1. LOAD ENVIRONMENT FIRST ---
# This must happen before you try to use any os.getenv calls
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI", "http://127.0.0.1:8000/callback")
CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
# --- 2. CONFIGURE AI ---
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)
    # Change this line in your main.py
    model = genai.GenerativeModel('gemini-flash-latest')
else:
    print("❌ ERROR: GEMINI_API_KEY is missing!")

# --- 3. INITIALIZE APP & MIDDLEWARE ---
app = FastAPI()

# Wide-open CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        os.getenv("FRONTEND_URL") # This allows your live Vercel link
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not CLIENT_ID or not CLIENT_SECRET:
    print("❌ ERROR: Spotify Credentials missing!")
else:
    print("✅ SUCCESS: All systems go.")

# --- 4. ROUTES ---

@app.get("/login")
def login():
    params = {
        "client_id": CLIENT_ID,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
        "scope": "user-top-read user-read-recently-played",
        "show_dialog": "true" 
    }
    auth_url = f"https://accounts.spotify.com/authorize?{urllib.parse.urlencode(params)}"
    return RedirectResponse(auth_url)

@app.get("/callback")
async def callback(code: str):
    token_url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload)
        res_data = response.json()

    access_token = res_data.get("access_token")
    if not access_token:
        return {"error": "Token failed", "details": res_data}

    # Redirecting to /connect so your React logic can catch the token
    return RedirectResponse(url=f"{FRONTEND_URL}/connect?token={access_token}")
@app.get("/get-stats")
async def get_stats(token: str):
    headers = {"Authorization": f"Bearer {token}"}
    
    async with httpx.AsyncClient() as client:
        try:
            # Fetching data...
            artists_res = await client.get("https://api.spotify.com/v1/me/top/artists?limit=10&time_range=medium_term", headers=headers)
            tracks_res = await client.get("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term", headers=headers)
            
            artists = artists_res.json().get("items", [])
            artist_names = [a['name'] for a in artists[:5]]
            genres = list(set([g for a in artists for g in a.get('genres', [])]))[:5]

            print(f"DEBUG: Found {len(artist_names)} artists. Starting AI...")

            # --- AI ROAST LOGIC ---
            ai_roast = ""
            try:    
                prompt = f"""
                Savage music roast for user whose top artist: {', '.join(artist_names)}. 
                and top tracks are: {', '.join([t['name'] for t in tracks_res.json().get('items', [])[:5]])}.
                3 witty sentences max. No emojis.
                """                
                # This is the line that's likely failing
                ai_response = model.generate_content(prompt)
                ai_roast = ai_response.text
                
                print(f"🔥 GENERATED ROAST: {ai_roast}")

            except Exception as ai_err:
                # THIS WILL PRINT THE EXACT AI ERROR IN YOUR TERMINAL
                print(f"❌ AI SPECIFIC ERROR: {ai_err}")
                ai_roast = "I'd roast you, but the AI is literally speechless at this disaster."

            return {
                "artists": artists,
                "tracks": tracks_res.json().get("items", []),
                "roast": ai_roast
            }

        except Exception as e:
            print(f"❌ GENERAL ERROR: {e}")
            return {"error": str(e)}