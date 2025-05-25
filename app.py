import base64
import io
import json
import uuid
import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify
import face_recognition
import numpy as np
from PIL import Image
from pymongo import MongoClient

app = Flask(__name__)

# Get MongoDB URI from environment variable
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["newsque"]
collection = db["users"]

def validate_user_data(data):
    required_fields = ["name", "age", "gender", "number", "address", "state", "city", "country", "postal", "college", "branch", "image"]
    for field in required_fields:
        if not data.get(field):
            return f"Missing field: {field}"
    return None

def decode_base64_image(image_data):
    try:
        if "," in image_data:
            _, encoded = image_data.split(",", 1)
        else:
            encoded = image_data
        img_bytes = base64.b64decode(encoded)
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        return np.array(pil_img)
    except Exception as e:
        print(f"Image decode error: {e}")
        return None

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/recognize")
def recognize():
    return render_template("recognize.html")

@app.route("/register_user", methods=["POST"])
def register_user():
    try:
        data = request.get_json()

        if not isinstance(data, dict):
            return jsonify({"status": "error", "message": "Invalid data format"}), 400

        error = validate_user_data(data)
        if error:
            return jsonify({"status": "error", "message": error}), 400

        rgb_img = decode_base64_image(data["image"])
        if rgb_img is None:
            return jsonify({"status": "error", "message": "Invalid image data"}), 400

        encodings = face_recognition.face_encodings(rgb_img)
        if not encodings:
            return jsonify({"status": "error", "message": "No face detected"}), 400

        avg_encoding = np.mean(encodings, axis=0)

        user_data = {
            "id": str(uuid.uuid4()),
            "name": data["name"],
            "age": data["age"],
            "gender": data["gender"],
            "number": data["number"],
            "address": data["address"],
            "state": data["state"],
            "city": data["city"],
            "country": data["country"],
            "postal": data["postal"],
            "college": {
                "name": data["college"],
                "branch": data["branch"]
            },
            "encoding": avg_encoding.tolist(),
            "registered_at": datetime.utcnow().isoformat()
        }

        collection.insert_one(user_data)

        return jsonify({"status": "success", "message": "User registered"})

    except Exception as e:
        print(f"Error in register_user: {e}")
        return jsonify({"status": "error", "message": "Internal error during registration."}), 500

@app.route("/recognize_face", methods=["POST"])
def recognize_face():
    try:
        data = request.get_json()
        image_data = data.get("image")

        if not image_data:
            return jsonify({"status": "error", "message": "No image data provided"}), 400

        rgb_img = decode_base64_image(image_data)
        if rgb_img is None:
            return jsonify({"status": "error", "message": "Invalid image data"}), 400

        unknown_encodings = face_recognition.face_encodings(rgb_img)
        if not unknown_encodings:
            return jsonify({"status": "error", "message": "No face detected"}), 400

        unknown_encoding = unknown_encodings[0]

        users = list(collection.find())

        best_match = None
        lowest_distance = float("inf")

        for user in users:
            known_encoding = np.array(user["encoding"])
            distance = face_recognition.face_distance([known_encoding], unknown_encoding)[0]
            if distance < 0.5 and distance < lowest_distance:
                lowest_distance = distance
                best_match = user

        if best_match:
            return jsonify({
                "status": "success",
                "name": best_match["name"],
                "age": best_match["age"],
                "gender": best_match["gender"],
                "number": best_match["number"],
                "address": best_match["address"],
                "state": best_match["state"],
                "city": best_match["city"],
                "country": best_match["country"],
                "postal": best_match["postal"],
                "college": best_match["college"]
            })

        return jsonify({"status": "error", "message": "No matching user found"})

    except Exception as e:
        print(f"Error in recognize_face: {e}")
        return jsonify({"status": "error", "message": "Internal error during recognition."}), 500

if __name__ == "__main__":
    app.run(debug=True)
