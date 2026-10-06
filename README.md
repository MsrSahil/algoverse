# DSA Visualizer

## Project Overview
DSA Visualizer is a MERN-stack application (MongoDB, Express, React/Vite, Node.js) that helps students understand Data Structures and Algorithms through interactive visualizations.

## Folder Structure
```
.
├── client/                 # React frontend (Vite)
│   ├── public/             # Static assets
│   ├── src/                # Frontend source code
│   │   ├── components/     # Reusable UI components
│   │   ├── config/         # Environment & API configurations
│   │   ├── pages/          # Application pages
│   │   ├── routes/         # React Router configurations
│   │   └── services/       # API calling services
│   ├── .env.example        # Example frontend environment variables
│   ├── package.json        # Frontend dependencies
│   └── vercel.json         # Vercel configuration for SPA routing
├── server/                 # Express backend
│   ├── src/                # Backend source code
│   │   ├── config/         # Database and server config
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middlewares (auth, errors)
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   └── services/       # Business logic
│   ├── .env.example        # Example backend environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main application entry point
├── package.json            # Root configuration with convenience scripts
└── README.md               # Project documentation
```

## How to Run Locally

### 1. Install Dependencies
Run the following command in the root directory to install both client and server dependencies:
```bash
npm run install-all
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory and `client` directory using the `.env.example` files.

**server/.env**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/dsa-visualizer
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the Application
Run the following command from the root directory to start both the React frontend and Express backend concurrently:
```bash
npm run dev
```
- Frontend will run on http://localhost:5173
- Backend will run on http://localhost:5000

## Environment Variables Reference

### Backend (`server/.env`)
| Variable | Purpose | Example |
|---|---|---|
| `PORT` | Port for the Express server to listen on. | `5000` |
| `NODE_ENV` | Sets the application environment. | `development` or `production` |
| `MONGO_URI` | MongoDB connection string (Atlas or Local). | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key used to sign JSON Web Tokens. | `my_jwt_secret_123` |
| `JWT_REFRESH_SECRET` | Secret key used to sign refresh tokens. | `my_refresh_secret_456` |
| `CLIENT_URL` | Allowed CORS origin(s). Can be comma-separated. | `http://localhost:5173,https://my-app.vercel.app` |

### Frontend (`client/.env`)
| Variable | Purpose | Example |
|---|---|---|
| `VITE_API_URL` | Base URL for backend API requests. | `https://my-api.onrender.com/api` |

## Deployment Guide (Render + Vercel + Atlas)

### 1. MongoDB Atlas
1. Create a free cluster on MongoDB Atlas.
2. In Database Access, create a user and copy the credentials.
3. In Network Access, allow access from anywhere (`0.0.0.0/0`).
4. Get your connection string (`MONGO_URI`).

### 2. Backend (Render)
1. Create a new "Web Service" on Render.
2. Connect your GitHub repository.
3. **Settings**:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**: Add all variables from the `server/.env` table above, including the `MONGO_URI` from Atlas. Set `CLIENT_URL` to your Vercel deployment URL (e.g., `https://your-app.vercel.app`).
5. Deploy and copy your Render URL (e.g., `https://my-api.onrender.com`). Note: Render's free tier spins down after inactivity, so the first request might take ~50 seconds. The frontend handles this state gracefully.

### 3. Frontend (Vercel)
1. Import your GitHub repository to Vercel.
2. **Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
3. **Environment Variables**:
   - Add `VITE_API_URL` and set it to your Render URL + `/api` (e.g., `https://my-api.onrender.com/api`).
4. Deploy the frontend. SPA routing is fully handled via the `vercel.json` file.
