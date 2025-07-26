import requests
import os
from dotenv import load_dotenv

load_dotenv()   # .env file load karega

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")   # ✅ yahi hona chahiye

def get_gemini_response(message):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

    headers = {"Content-Type": "application/json"}

    data = {
        "contents": [
            {"parts": [{"text": message}]}
        ]
    }

    response = requests.post(
        f"{url}?key={GEMINI_API_KEY}",
        headers=headers,
        json=data
    )

    if response.status_code == 200:
        result = response.json()
        try:
            return result['candidates'][0]['content']['parts'][0]['text']
        except (KeyError, IndexError):
            return "❌ Gemini ka response sahi parse nahi hua."
    else:
        return f"❌ Error {response.status_code}: {response.text}"
