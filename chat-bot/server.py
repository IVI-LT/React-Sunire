"""
# openai api 

from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt")

    response = openai.Completion.create(
        model="text-davinci-003",  # Specify the model you want to use
        prompt=prompt,
        max_tokens=512,
        temperature=0
    )

    return jsonify(response.choices[0].text.strip())

if __name__ == "__main__":
    PORT = 8020
    app.run(port=PORT, debug=True)

"""



# using together.ai

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv, find_dotenv
from together import Together

load_dotenv()

client = Together(api_key = os.getenv("TOGETHER_API_KEY"))


app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt")

    # Create a completion using Together API
    stream = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )

    response_text = ""
    for chunk in stream:
        response_text += chunk.choices[0].delta.content or ""

    return jsonify(response_text.strip())

if __name__ == "__main__":
    PORT = 8020
    app.run(port=PORT, debug=True)

#for chunk in stream:
#  print(chunk.choices[0].delta.content or "", end="", flush=True)