# QuickRide (MERN)

QuickRide is a ride-hailing demo application built with a **React + Vite frontend** and an **Express + MongoDB backend**. It supports user/captain authentication, live ride tracking via WebSockets (Socket.IO), and a simple ride request flow.

---

## ✅ Key Features

- **User & Captain authentication** (JWT + cookies)
- **Ride booking flow** (request, accept, finish)
- **Live tracking** via Socket.IO
- **Map suggestions** (Google Maps API integration via @react-google-maps/api)
- **REST API** with clean service/controller architecture

---

## 🧱 Repository Structure

```
backend/   # Express API, MongoDB models, auth, socket server
frontend/  # React + Vite UI, routing, socket client
```

---

## 🚀 Running Locally

You will run the backend and frontend as two separate apps (two terminals).

### 1) Backend (API)

1. `cd backend`
2. `npm install`
3. Create a `.env` file with these required variables:

```env
DB_CONNECT=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=3000
FRONTEND_URL=http://localhost:5173
```

4. Start the server:

```sh
node server.js
```

> The API defaults to **http://localhost:3000** (or the port defined by `PORT`).

### 2) Frontend (React + Vite)

1. `cd frontend`
2. `npm install`
3. Create a `.env` file with the backend base URL:

```env
VITE_BASE_URL=http://localhost:3000
```

4. Start the dev server:

```sh
npm run dev
```

> The frontend defaults to **http://localhost:5173**.

---

## 🔧 Environment Variables

### Backend
| Variable | Description |
|---------|-------------|
| `DB_CONNECT` | MongoDB connection string (required) |
| `JWT_SECRET` | Secret used to sign JWT tokens (required) |
| `PORT` | Port for the backend API (defaults to `3000`) |
| `FRONTEND_URL` | Frontend origin for CORS (`http://localhost:5173` by default) |

### Frontend
| Variable | Description |
|---------|-------------|
| `VITE_BASE_URL` | URL of the backend API (e.g. `http://localhost:3000`) |

---

## 🧩 Using the API

The backend exposes these main route groups:

- **Users**: `/users/*` (register, login, logout, profile)
- **Captains**: `/captains/*` (register, login, logout, profile)
- **Rides**: `/rides/*` (create ride requests, accept, finish)
- **Maps**: `/maps/*` (suggestions, geocoding)

> For detailed request/response schema, see `backend/README.md` (covers auth endpoints in detail).

---

## 📝 Notes

- The frontend uses **Socket.IO** and expects the backend to expose the Socket server at the same origin as `VITE_BASE_URL`.
- If you change the backend port, update both `PORT` (backend) and `VITE_BASE_URL` (frontend).

---

## 📦 Deploying / Production

This repo is not configured with a deployment pipeline. For deployment:

1. Host the backend on a Node-compatible environment (Heroku, Railway, Vercel Serverless, etc.).
2. Host the frontend as a static build (Vercel, Netlify, Surge, etc.).
3. Ensure the frontend `VITE_BASE_URL` points to the deployed backend and that CORS is allowed.

---

## 🧠 Further Improvements (Optional)

- Add proper logging & error handling
- Add tests for critical routes
- Add a more robust deployment process (Docker, CI)

---

Enjoy building with QuickRide!
