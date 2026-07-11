# DSA Visualizer

> **Learn Data Structures & Algorithms by seeing how they actually work.**

DSA Visualizer is an interactive full-stack learning platform designed to help students understand **Data Structures and Algorithms through step-by-step visualizations, explanations, code examples, complexity analysis, and practice resources**.

Instead of only reading theory or memorizing code, users can visually observe how an algorithm processes data at every step.

---

## 📌 Project Status

**Current Stage:** MVP Development
**Project Type:** Full-Stack MERN Application
**Status:** 🚧 Under Active Development

### Current Progress

* [x] MERN project setup
* [x] Frontend setup
* [x] Backend setup
* [x] Home page
* [x] Register page UI
* [x] Registration backend and database connection
* [x] Login page UI
* [ ] Complete login backend integration
* [ ] Authentication state management
* [ ] Protected routes
* [ ] Dashboard
* [ ] Algorithms listing page
* [ ] Algorithm details page
* [ ] Visualization engine
* [ ] Progress tracking
* [ ] Favorites
* [ ] Profile page
* [ ] Testing
* [ ] Deployment

> Update this checklist whenever a feature is completed.

---

# 🎯 Project Vision

Learning DSA can be difficult because most resources explain algorithms using static text, code, or diagrams.

DSA Visualizer aims to solve this problem by providing an interactive learning experience where users can:

* Watch algorithms execute step by step
* Understand what happens during each operation
* Control the visualization
* Read simple explanations
* View code implementations
* Analyze time and space complexity
* Practice related problems
* Track learning progress

The long-term goal is to build a complete visual learning platform for DSA and coding interview preparation.

---

# 🚀 MVP Goal

The first version of DSA Visualizer will focus on the core learning experience.

The MVP should allow a user to:

1. Create an account
2. Log in securely
3. Browse DSA categories
4. Select an algorithm
5. Read information about the algorithm
6. Watch an interactive visualization
7. Control the visualization
8. View implementation code
9. Understand time and space complexity
10. Track completed algorithms
11. Save favorite algorithms

Advanced features should not be added until the MVP is stable.

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT
* bcrypt
* HTTP-only cookies
* Google OAuth

## Development Tools

* Git
* GitHub
* VS Code
* GitHub Copilot
* Postman

---

# 🏗️ High-Level Architecture

```text
User
  │
  ▼
React Frontend
  │
  │ HTTP / API Requests
  ▼
Express REST API
  │
  ├── Authentication
  ├── User Management
  ├── Progress Tracking
  └── Favorites
  │
  ▼
MongoDB Database
```

The algorithm visualization logic primarily runs on the frontend.

---

# 📁 Recommended Project Structure

```text
DSA-Visualizer/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   ├── auth/
│   │   │   └── visualizer/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Dashboard/
│   │   │   ├── Algorithms/
│   │   │   ├── AlgorithmDetails/
│   │   │   ├── Profile/
│   │   │   └── NotFound/
│   │   │
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── constants/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
└── README.md
```

The actual structure may evolve as the project grows.

---

# 🖥️ Application Pages

## 1. Home Page

The Home Page introduces the platform and helps users discover the main features.

### Main Sections

* Navbar
* Hero section
* Features
* Learning categories
* How it works
* Popular algorithms
* Platform statistics
* Why choose DSA Visualizer
* Call to action
* Footer

### Main Actions

* Start Learning
* Explore Algorithms
* Login
* Create Account

---

## 2. Register Page

Allows new users to create an account.

### Registration Fields

* Full Name
* Username
* Email
* Password
* Confirm Password
* Terms and Privacy agreement

### Features

* Frontend validation
* Password visibility toggle
* Password strength indicator
* Password requirements
* Loading state
* Error handling
* Google registration
* Link to Login

### Registration Flow

```text
User fills registration form
        │
        ▼
Frontend validation
        │
        ▼
POST /api/auth/register
        │
        ▼
Backend validation
        │
        ▼
Check duplicate email/username
        │
        ▼
Hash password
        │
        ▼
Create user in MongoDB
        │
        ▼
Return success response
```

---

## 3. Login Page

Allows existing users to access their accounts.

### Fields

* Email
* Password
* Remember Me

### Features

* Show/hide password
* Forgot password link
* Form validation
* Loading state
* Error handling
* Google login
* Link to Register

### Login Flow

```text
User enters credentials
        │
        ▼
Frontend validation
        │
        ▼
POST /api/auth/login
        │
        ▼
Find user
        │
        ▼
Verify password
        │
        ▼
Generate authentication token
        │
        ▼
Set secure HTTP-only cookie
        │
        ▼
Redirect to Dashboard
```

---

## 4. Dashboard

The Dashboard will become the user's personal learning center.

### Planned Sections

* Welcome message
* Learning progress
* Continue learning
* Recently viewed algorithms
* Favorite algorithms
* Completed algorithms
* Recommended next topic

---

## 5. Algorithms Page

Displays available algorithms organized by category.

### Planned Categories

#### Sorting

* Bubble Sort
* Selection Sort
* Insertion Sort
* Merge Sort
* Quick Sort

#### Searching

* Linear Search
* Binary Search

#### Stack

* Push
* Pop
* Peek

#### Queue

* Enqueue
* Dequeue
* Front

#### Linked List

* Insert
* Delete
* Search

#### Trees

* Binary Tree
* Binary Search Tree
* Tree Traversals

#### Graphs

* Breadth-First Search
* Depth-First Search
* Dijkstra's Algorithm

More algorithms can be added after the core MVP is complete.

---

# 🧠 Algorithm Details Page

This is the most important page in the application.

Each algorithm page should contain:

## Algorithm Information

* Algorithm name
* Category
* Difficulty
* Description
* Use cases

## Visualization Area

The user should visually see the algorithm executing.

Example:

```text
Initial Array

[50] [30] [80] [10]

Compare 50 and 30

[50] [30] [80] [10]
  ↑    ↑

Swap

[30] [50] [80] [10]
```

## Visualization Controls

* Play
* Pause
* Next Step
* Previous Step
* Restart
* Speed control
* Generate random input
* Custom input

## Step Explanation

Example:

```text
Step 3

Comparing 50 and 30.

Since 50 > 30, the two elements are swapped.
```

## Complexity Analysis

Display:

* Best-case time complexity
* Average-case time complexity
* Worst-case time complexity
* Space complexity

## Code Implementations

Planned languages:

* Java
* JavaScript
* C++
* Python

## Practice Section

Display relevant practice problems and learning resources.

---

# 🎬 Visualization Engine

The visualization engine is the core technical feature of the project.

The engine should separate:

```text
Algorithm Logic
      │
      ▼
Generate Visualization Steps
      │
      ▼
Store Steps
      │
      ▼
Visualization Controller
      │
      ▼
Render Current Step
```

An algorithm should not directly control UI animation.

Instead, the algorithm should generate a sequence of steps.

Example:

```javascript
[
  {
    type: "compare",
    indices: [0, 1],
    array: [50, 30, 80, 10]
  },
  {
    type: "swap",
    indices: [0, 1],
    array: [30, 50, 80, 10]
  }
]
```

This architecture makes it easier to support:

* Play
* Pause
* Next
* Previous
* Restart
* Speed changes

The first visualizer to implement should be **Bubble Sort**.

After Bubble Sort works correctly, reuse the visualization architecture for other algorithms.

---

# 🔐 Authentication System

The authentication system should support:

## Normal Authentication

* Email registration
* Email login
* Password hashing
* JWT authentication
* Secure cookies
* Logout

## Social Authentication

* Google OAuth

Additional providers can be added later.

## Security Requirements

* Never store plain-text passwords
* Never return passwords in API responses
* Validate all user input on the backend
* Use environment variables for secrets
* Use secure HTTP-only cookies
* Use centralized error handling
* Protect private routes
* Configure CORS correctly

---

# 🗄️ Database Design

## User Collection

Example structure:

```javascript
{
  fullName: String,
  username: String,
  email: String,
  password: String,
  avatar: String,

  provider: String,
  googleId: String,

  role: String,

  emailVerified: Boolean,
  isActive: Boolean,

  progress: [],
  favorites: [],

  createdAt: Date,
  updatedAt: Date
}
```

Passwords must be excluded from normal API responses.

---

# 🔌 Planned API Structure

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

## Google Authentication

```text
GET    /api/auth/google
GET    /api/auth/google/callback
```

## Users

```text
GET    /api/users/profile
PATCH  /api/users/profile
```

## Progress

```text
GET    /api/progress
POST   /api/progress
PATCH  /api/progress/:algorithmId
```

## Favorites

```text
GET     /api/favorites
POST    /api/favorites/:algorithmId
DELETE  /api/favorites/:algorithmId
```

API routes may change during development.

---

# 🛣️ Application Routes

## Public Routes

```text
/
/login
/register
/algorithms
/algorithm/:slug
```

## Protected Routes

```text
/dashboard
/profile
```

Protected routes should redirect unauthenticated users to `/login`.

---

# 🗺️ MVP Development Roadmap

## Phase 1 — Project Foundation

* [x] Initialize frontend
* [x] Initialize backend
* [x] Configure project structure
* [x] Configure routing
* [x] Create global design system

## Phase 2 — Landing Page

* [x] Navbar
* [x] Hero section
* [x] Features
* [x] Categories
* [x] Popular algorithms
* [x] CTA
* [x] Footer
* [x] Responsive design

## Phase 3 — Authentication

* [x] Register UI
* [x] Register API
* [x] MongoDB user storage
* [x] Password hashing
* [ ] Login UI
* [ ] Login API integration
* [ ] JWT authentication
* [ ] HTTP-only authentication cookie
* [ ] Logout
* [ ] Get current user
* [ ] Auth Context
* [ ] Protected routes
* [ ] Google OAuth

## Phase 4 — Core Application UI

* [ ] Dashboard
* [ ] Algorithms page
* [ ] Algorithm details page
* [ ] Profile page
* [ ] 404 page

## Phase 5 — First Visualization

Build only one complete visualizer first.

### Bubble Sort

* [ ] Generate array
* [ ] Accept custom input
* [ ] Generate algorithm steps
* [ ] Render bars
* [ ] Compare animation
* [ ] Swap animation
* [ ] Play
* [ ] Pause
* [ ] Next
* [ ] Previous
* [ ] Restart
* [ ] Speed control
* [ ] Step explanation

## Phase 6 — More Algorithms

### Sorting

* [ ] Selection Sort
* [ ] Insertion Sort
* [ ] Merge Sort
* [ ] Quick Sort

### Searching

* [ ] Linear Search
* [ ] Binary Search

### Data Structures

* [ ] Stack
* [ ] Queue
* [ ] Linked List

### Advanced

* [ ] Trees
* [ ] Graphs

## Phase 7 — Learning Features

* [ ] Progress tracking
* [ ] Completed algorithms
* [ ] Favorites
* [ ] Recently viewed
* [ ] Continue learning

## Phase 8 — Quality

* [ ] Responsive testing
* [ ] Accessibility testing
* [ ] API testing
* [ ] Authentication testing
* [ ] Error handling
* [ ] Loading states
* [ ] Empty states
* [ ] Performance optimization

## Phase 9 — Deployment

* [ ] Deploy frontend
* [ ] Deploy backend
* [ ] Configure production database
* [ ] Configure environment variables
* [ ] Configure production CORS
* [ ] Test authentication in production
* [ ] Final QA

---

# 🔮 Future Scope

The following features are **not part of the initial MVP**.

They may be added after the core platform is stable.

## AI Tutor

Allow users to ask questions about algorithms and receive contextual explanations.

## AI Step Explanation

Generate beginner-friendly explanations for difficult algorithm steps.

## Code Execution

Allow users to write and execute code directly in the browser.

## Coding Challenges

Add an integrated coding problem-solving environment.

## Quizzes

Test understanding after completing a topic.

## Learning Paths

Examples:

```text
Beginner DSA Path

Arrays
   ↓
Searching
   ↓
Sorting
   ↓
Stack
   ↓
Queue
   ↓
Linked List
```

## Algorithm Comparison

Compare algorithms visually.

Example:

```text
Bubble Sort vs Merge Sort
```

Compare:

* Execution
* Number of operations
* Time complexity
* Performance

## Notes

Allow users to create personal notes.

## Leaderboard

Gamified learning progress.

## Achievements

Badges for completing learning milestones.

## Certificates

Certificates for completing learning paths.

## Admin Panel

Manage:

* Algorithms
* Users
* Learning content
* Practice questions

---

# ❌ Features We Should Not Build Yet

To prevent unnecessary complexity, do not prioritize:

* AI Tutor
* Live code compiler
* Leaderboard
* Certificates
* Advanced gamification
* Complex admin panel
* Real-time collaboration

Complete the core learning experience first.

---

# 🧑‍💻 Development Principles

Every developer working on this project should follow these rules:

1. Build one feature completely before starting another.
2. Do not add features outside the current scope.
3. Reuse components instead of duplicating code.
4. Keep business logic separate from UI components.
5. Keep API logic inside service modules.
6. Validate data on both frontend and backend.
7. Never hardcode secrets.
8. Keep the visualization engine independent from individual algorithms where possible.
9. Test existing functionality after every major change.
10. Keep this README updated.

---

# 🌿 Suggested Git Workflow

Use clear commit messages.

Examples:

```text
feat: add register page
feat: implement user registration API
feat: add login page
feat: implement JWT authentication
feat: add protected routes
feat: create algorithms listing page
feat: add bubble sort visualizer

fix: resolve registration validation issue
fix: correct authentication cookie configuration

refactor: extract reusable auth components
docs: update project roadmap
```

---

# 🎯 Current Development Priority

The project should currently be developed in this order:

```text
1. Complete Login Authentication
          ↓
2. Add Auth Context
          ↓
3. Add Protected Routes
          ↓
4. Add Logout
          ↓
5. Build Dashboard
          ↓
6. Build Algorithms Page
          ↓
7. Build Algorithm Details Page
          ↓
8. Build Bubble Sort Visualizer
          ↓
9. Add More Algorithms
          ↓
10. Add Progress & Favorites
          ↓
11. Test
          ↓
12. Deploy
```

**Do not jump directly to advanced features before completing the current development priority.**

---

# 📖 Project Summary

DSA Visualizer is being developed as a modern interactive platform for learning Data Structures and Algorithms.

The core philosophy is simple:

> **Don't just read an algorithm. See how it works.**

The project combines:

* Interactive learning
* Algorithm visualization
* Step-by-step explanations
* Code examples
* Complexity analysis
* Practice resources
* Progress tracking

The first priority is to build a stable and polished MVP. Advanced features will be added only after the core learning experience is complete.

---

## 🚧 Development Status

This project is currently under active development.

Features, architecture, APIs, and documentation may evolve as development continues.
