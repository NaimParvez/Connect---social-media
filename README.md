# Connect---Social-Media

> ⚠️ **Status: Under Development** - This project is currently in active development.

A full-stack social media application with user authentication, friend requests, and real-time features. Built with Node.js/Express for the backend and React/Vite for the frontend.

## Features (Planned/In Progress)

- ✅ User registration and login (authentication)
- ✅ Friend request system
- ✅ User profile management
- 🔄 Real-time updates (e.g., friend requests) - _In Progress_
- 🔄 Modern, responsive frontend UI - _In Progress_
- 📋 Social media posts and timeline - _Planned_
- 📋 Image/media uploads - _Planned_
- 📋 Comments and reactions - _Planned_
- 📋 Chat/messaging system - _Planned_
- 📋 Video Calling system - _Planned_

## Current Status

This project is in early development phase. The basic authentication system and backend API structure are implemented, but many features are still under development or planned for future releases.

## Project Structure

```
Connect---social-media/
├── backend/      # Node.js/Express API
│   ├── src/
│   │   ├── controllers/   # Route controllers (auth, user)
│   │   ├── lib/           # Database and stream utilities
│   │   ├── middleware/    # Express middleware (auth)
│   │   ├── models/        # Mongoose models (User, FriendRequest)
│   │   └── routes/        # API route definitions
│   └── package.json
├── frontend/     # React app (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

> **Note:** This project is under active development. Some features may not be fully functional yet.

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB URI and any required secrets:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## API Endpoints (Backend)

> **Note:** API endpoints are subject to change during development.

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/user/profile` — Get user profile (auth required)
- `POST /api/user/friend-request` — Send a friend request
- `GET /api/user/friend-requests` — List incoming friend requests
- ...and more (see `backend/src/routes/` for current implementation)

## Technologies Used

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React, Vite, CSS

## Contributing

This project is actively being developed. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## Development Roadmap

- [ ] Complete frontend UI components
- [ ] Implement real-time notifications
- [ ] Add post creation and timeline
- [ ] Implement image/media upload functionality
- [ ] Add chat/messaging system
- [ ] User profile customization
- [ ] Mobile responsiveness improvements
- [ ] Testing suite implementation

## Known Issues

- Frontend styling is incomplete
- Real-time features need WebSocket implementation
- Some API endpoints may need validation improvements

## License

[MIT](LICENSE)
