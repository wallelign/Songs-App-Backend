# Songs Management API

This is the backend for the Songs Management App, built with Node.js and Express, using MongoDB as the database.

## 📌 Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (Running locally or on a cloud service)

## 📥 Installation
Clone the repository and install dependencies:

```sh
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

## 🔧 Configuration
Create a `.env` file in the root directory and add the following:

```
PORT=5000
BASE_URL=http://localhost:5000
MONGO_URI=mongodb://localhost:27017/songsDB
```

This configures the backend server and connects to MongoDB.

## 🚀 Running the Project
To start the backend server, run:

```sh
npm run dev
```

The server should now be running on `http://localhost:5000`.

## 🛠 RESTful API Standards
All API responses include the `Content-Type: application/json` header to ensure proper data formatting.

## 📜 License
This project is licensed under [MIT License](LICENSE).

Happy Coding! 🎵

