from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend
bcrypt = Bcrypt(app)


# Replace with your MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://sravanivreddy4:shamu2306@cluster0.o541l.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["user-auth"]
users_collection = db["users"]

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user_data = {"name": name, "email": email, "password": hashed_password}

    users_collection.insert_one(user_data)
    return jsonify({"message": "User registered successfully"}), 201

# Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Login successful", "user": {"name": user["name"], "email": user["email"]}}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
