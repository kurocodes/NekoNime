# 🐾 NekoNime – Anime Info & Discussion Platform

NekoNime is a fullstack anime platform where users can explore anime details, manage their watchlists, rate anime, and engage in lively discussions. Built with the power of **React**, **Node.js**, **Express**, and **MongoDB**, it’s your cozy digital haven for anime lovers~!

---

## 🌟 Features

- 🔍 **Browse Anime** – Search and view detailed info from AniList API
- 📝 **Watch Lists** – Add anime to *watching*, *completed*, *dropped*, or *onhold*
- 💬 **Comment Section** – Comment and reply on anime entries with pagination
- ❤️ **Like System** – Like comments and replies
- 🔐 **Authentication** – Signup/login
- 🎨 **User Profiles** – Profile picture, username, anime lists

---

## 📸 Demo

> [🚀 Live Demo Link](https://nekonime.vercel.app) *(if hosted)*

---

## 🧰 Tech Stack

### Frontend:
- React
- Tailwind CSS
- React Router
- Axios
- react-hook-form

### Backend:
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- express-async-handler

### Other:
- AniList GraphQL API
- Cloudinary (for profile pictures)
- Vite (frontend bundler)

---

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/your-username/NekoNime.git
cd NekoNime
```

### Set up environment variables

Create a `.env` file in both `/frontend` and `/backend` folders.

#### `/fronted/.env`
```env
VITE_BACKEND_URL=http://localhost:3000
```

#### `/backend/.env`
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=...
...
```

### Install and run

#### For backend:
```bash
cd backend
npm install
nodemon index.js
```

#### For frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Upcoming Features

- 🧵 Threaded Discussions
- 🎭 User Avatars & Bios
- 📨 Notifications
- 🔍 Advanced search & filters
- 📝 Custom Lists

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 💖 Credits

- API Source: [AniList GraphQL](https://anilist.gitbook.io/)
