# DSA Visualizer

> Visualize. Understand. Master DSA.

DSA Visualizer is a modern interactive learning platform designed to help students understand Data Structures and Algorithms through visualizations, step-by-step explanations, complexity analysis, code implementations, dry runs, and practice problems.

Instead of relying solely on static theoretical descriptions or memorizing code snippets, learners can visually observe how algorithms process data, perform comparisons, execute swaps, and update internal state during each step of execution.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Problem Statement](#2-problem-statement)
- [3. Project Goal](#3-project-goal)
- [4. Key Features](#4-key-features)
- [5. Current Project Status](#5-current-project-status)
- [6. Application Flow](#6-application-flow)
- [7. Current Architecture](#7-current-architecture)
- [8. Technology Stack](#8-technology-stack)
- [9. Project Structure](#9-project-structure)
- [10. Authentication System](#10-authentication-system)
- [11. Dashboard](#11-dashboard)
- [12. Algorithms Library](#12-algorithms-library)
- [13. Algorithm Details Page](#13-algorithm-details-page)
- [14. Visualization Architecture Status](#14-visualization-architecture-status)
- [15. Visualization Development Principles](#15-visualization-development-principles)
- [16. Supported Algorithms](#16-supported-algorithms)
- [17. Current MVP Scope](#17-current-mvp-scope)
- [18. Future Roadmap](#18-future-roadmap)
- [19. Installation](#19-installation)
- [20. Environment Variables](#20-environment-variables)
- [21. Running the Project](#21-running-the-project)
- [22. Available Scripts](#22-available-scripts)
- [23. API & Backend Overview](#23-api--backend-overview)
- [24. Development Guidelines](#24-development-guidelines)
- [25. Git Workflow](#25-git-workflow)
- [26. Testing Checklist](#26-testing-checklist)
- [27. Known Limitations](#27-known-limitations)
- [28. Future Improvements](#28-future-improvements)
- [29. Contributing](#29-contributing)
- [30. License](#30-license)
- [31. Author](#31-author)

---

## 1. Project Overview

Learning Data Structures and Algorithms (DSA) is essential for computer science education and technical interview preparation. However, traditional DSA learning methods rely heavily on static textbook diagrams, theoretical pseudocode, and mental execution tracing.

Students are frequently expected to mentally simulate dynamic operations such as:
- **Arrays & Strings:** In-place shifting, window sliding, two-pointer convergence.
- **Sorting Algorithms:** Successive comparison passes, pivot partitioning, and recursive merges.
- **Searching Algorithms:** Linear scans and binary search space reduction.
- **Linear Data Structures:** Linked list pointer rewiring, stack LIFO push/pop, queue FIFO enqueue/dequeue.
- **Trees & Graphs:** Recursion trees, tree balance rotations, Breadth-First Search (BFS) queue frontiers, Depth-First Search (DFS) backtracks, and shortest-path relaxations.

**DSA Visualizer** addresses this challenge by converting algorithm execution into interactive, step-by-step visual experiences. By combining visual timelines with code walkthroughs, dry runs, and time/space complexity analysis, the platform helps developers build genuine algorithmic intuition.

> **Note on AI Features:** AI-assisted explanations and dynamic hint systems are not currently implemented and are planned for future evaluation after the core visualizer engine is established.

---

## 2. Problem Statement

Computer science students and self-taught developers frequently grasp theoretical definitions but struggle when converting theory into runtime execution mental models:

- **Comparisons:** Which elements are currently evaluated against each other?
- **Swaps & Reassignments:** How do index positions and values change over time?
- **Traversals & Pointer Movement:** Where are read/write pointers located in memory structures?
- **Recursion & Call Stacks:** How do recursive frames wind and unwind?
- **Graph & Tree State Changes:** Which nodes are unvisited, queued, active, or finalized?

```text
┌────────────────┐      ┌──────────────┐      ┌────────────────┐      ┌─────────────────────────┐
│     Theory     │  ──► │     Code     │  ──► │   Execution    │  ──► │  Visual Understanding   │
│ (Text/Formula) │      │ (Syntax/API) │      │ (State Changes)│      │  (Intuition & Mastery)  │
└────────────────┘      └──────────────┘      └────────────────┘      └─────────────────────────┘
```

DSA Visualizer bridges this gap by rendering algorithm state transformations transparently and interactively.

---

## 3. Project Goal

The primary goals of the DSA Visualizer project are:

1. **Make DSA Intuitive:** Replace static diagrams with step-by-step visual state animations.
2. **Provide Interactive Learning:** Give learners full control over playback, speed, step progression, and custom inputs.
3. **Offer Multi-Language Reference Implementations:** Provide tested code in JavaScript, Python, Java, and C++.
4. **Clarify Algorithmic Complexity:** Break down best, average, and worst-case time complexities along with auxiliary space complexity.
5. **Demonstrate Dry Runs:** Show structured, step-by-step execution traces alongside algorithm explanations.
6. **Promote Conceptual Understanding:** Encourage understanding of runtime invariants over rote syntax memorization.
7. **Track Learner Progression:** Evolve into a comprehensive learning hub with persisted progress, favorites, and activity history.

---

## 4. Key Features

### 4.1 Platform & Architecture
- **MERN Stack:** Decoupled client (React 19 + Vite) and server (Node.js + Express 5 + MongoDB via Mongoose 9).
- **Client-Side Routing:** Declarative route structure using React Router DOM (`v7`).
- **Modern Styling:** Utility-first responsive design using Tailwind CSS (`v4`) and Lucide React icons.
- **Centralized Data Layer:** Single-source-of-truth metadata module for algorithm definitions, complexity metrics, and code snippets.

### 4.2 Authentication & Security
- **User Registration:** Validates full name, unique username, valid email format, and password complexity.
- **User Login:** Credential verification with optional "Remember Me" session duration handling.
- **Cryptographic Security:** Passwords hashed with `bcrypt` (10 salt rounds) using pre-save Mongoose hooks; password fields omitted from query results by default (`select: false`).
- **JWT Authentication:** Stateless tokens signed with `jsonwebtoken` and delivered via secure `httpOnly` cookies (`SameSite: Lax`, `secure` in production).
- **Session Management:** `AuthContext` provides global session state, initial bootstrap verification (`/api/auth/me`), login, register, and logout methods.
- **Route Protection:** `ProtectedRoute` guards private routes (redirects guests to `/login`); `GuestRoute` prevents authenticated users from revisiting auth pages (redirects to `/dashboard`).
- **Dynamic Navigation:** Responsive `Navbar` adapts links, mobile drawer, and logout controls based on live authentication state.

### 4.3 Landing / Home Page
- **Hero Section:** Value proposition, call-to-action buttons, and preview typography.
- **Feature Highlights:** Interactive breakdown of key learning tools.
- **Category Showcase:** Overview of algorithm families (Sorting, Searching, Data Structures, Trees, Graphs).
- **How It Works:** Three-step breakdown of the learning methodology.
- **Popular Algorithms & Platform Stats:** Interactive summary cards.
- **Responsive Layout:** Optimized for mobile, tablet, and desktop viewports.

### 4.4 Dashboard
- **Personalized Header:** Dynamic welcome banner displaying the logged-in user's name or username.
- **Learning Metrics Overview:** Cards highlighting Completed Topics, In-Progress items, Overall Progress %, and Favorites count.
- **Progress Card:** Visual progress bar with motivational milestone copy.
- **Continue Learning Card:** Quick jump back into the active topic (Bubble Sort).
- **Category Grid:** 10 core computer science topic cards.
- **Recommended Algorithms:** Curated recommendations with direct links.
- **Recent Activity & Favorites UI:** Activity feed and quick-access bookmarks.
- **Learning Journey:** Step-by-step roadmap track.
- *Implementation Note:* Dashboard learning metrics, favorites, and recent activity are currently driven by structured mock data (`dashboardData.js`). Backend persistence for user progress and activity is scheduled for a subsequent phase.

### 4.5 Algorithms Library
- **Centralized Dataset:** Powered by `algorithms.js` containing 15 categorized algorithms.
- **Search:** Real-time search across titles, descriptions, and metadata tags.
- **Category Filtering:** Filter by All, Sorting, Searching, Data Structures, Trees, and Graphs.
- **Difficulty Filtering:** Filter by All, Easy, Medium, and Hard.
- **Status Filtering:** Filter by All, Available, and Coming Soon.
- **Sorting Options:** Sort by Recommended, Alphabetical, Difficulty, and Learning Time.
- **URL Parameter Synchronization:** Full two-way sync between filter UI state and browser query parameters (`?category=...&difficulty=...&search=...`).
- **Algorithm Cards:** Badges for difficulty, estimated time, category, key idea summary, and status.
- **Empty State:** Dedicated fallback view with a single-click "Clear Filters" action.

### 4.6 Algorithm Details Page (`/algorithm/:slug`)
- **Dynamic Slug Lookup:** Routes dynamically map slugs to metadata from `algorithms.js`.
- **Header & Action Bar:** Displays title, category, difficulty, estimated time, and client-side interactive Favorite & Mark Complete toggle buttons.
- **Overview Card:** Highlights what the algorithm is, practical scenarios for when to use it, and the foundational concept.
- **Complexity Analysis:** Grid showing best, average, and worst-case time complexities alongside auxiliary space complexity.
- **Multi-Language Code Tabs:** Syntax-highlighted code implementations in JavaScript, Python, Java, and C++ with one-click copy functionality.
- **Structured Dry Run:** Step-by-step table/card walkthrough tracing variables and state transitions.
- **Practice Problems Section:** External and internal problem references (e.g., LeetCode links).
- **Related Algorithms & Bottom Navigation:** Links to related techniques and pagination to navigate through the algorithm catalog.
- **Error Handling:** Graceful fallback to `NotFound` for invalid slugs.
- **Status Handling:** Visible "Coming Soon" banner for algorithms pending visualizer implementation.

### 4.7 Visualization Workspace (Placeholder / UI Layout)
- **Preview Workspace:** Bar-height preview representing the initial array state (e.g., Bubble Sort `[50, 30, 80, 10, 60]`).
- **Controls Bar:** Disabled UI buttons for Previous Step, Play, Pause, Next Step, Restart, and Speed selection (0.5x, 1x, 1.5x, 2x).
- **Custom Input Bar:** Input field with placeholder for custom array inputs (`50, 30, 80, 10, 60`).
- *Implementation Note:* The interactive step execution engine is under active development and is not yet connected to runtime state.

---

## 5. Current Project Status

The following table reflects the verified state of the codebase:

| Feature / Component | Category | Current Status | Notes |
|---|---|---|---|
| MERN Project Structure | Core Architecture | ✅ Complete | Express 5 backend + Vite React 19 frontend |
| MongoDB Connection & Configuration | Backend | ✅ Complete | Mongoose connection with error handling |
| User Schema & Validation | Backend | ✅ Complete | Validation rules, pre-save bcrypt hook, JSON sanitization |
| User Registration API (`POST /api/auth/register`) | Backend | ✅ Complete | Validates inputs, creates user, issues JWT cookie |
| User Login API (`POST /api/auth/login`) | Backend | ✅ Complete | Validates credentials, Remember Me dynamic token duration |
| User Logout API (`POST /api/auth/logout`) | Backend | ✅ Complete | Clears `accessToken` cookie |
| Session Verification API (`GET /api/auth/me`) | Backend | ✅ Complete | Verifies JWT and returns authenticated user |
| Auth Middleware (`authenticate`, `authorize`) | Backend | ✅ Complete | Cookie / Bearer token extraction and role verification |
| Global Error Handling Middleware | Backend | ✅ Complete | Standardized `ApiError` and `ApiResponse` envelope |
| AuthContext & Session Bootstrap | Frontend | ✅ Complete | Auto-verifies session on app load, exposes auth methods |
| Protected & Guest Route Guards | Frontend | ✅ Complete | Guards `/dashboard`, `/profile`, `/login`, `/register` |
| Navigation Bar (Navbar) & Footer | Frontend | ✅ Complete | Auth-aware links, mobile responsive drawer, logout action |
| Home / Landing Page | Frontend | ✅ Complete | Complete hero, feature, category, and statistic sections |
| Dashboard UI | Frontend | ✅ Complete | Rendered using structured mock data (`dashboardData.js`) |
| Algorithms Library Page | Frontend | ✅ Complete | Real-time search, filters, sorting, and URL query param sync |
| Shared Algorithm Dataset (`algorithms.js`) | Frontend | ✅ Complete | 15 algorithms with metadata, code, complexity, and dry runs |
| Algorithm Details Page (`/algorithm/:slug`) | Frontend | ✅ Complete | Dynamic routing, code tabs, copy button, dry run walkthrough |
| Visualization UI Layout & Workspace | Frontend | ✅ Complete | Static visual preview, controls UI, custom input panel |
| Interactive Visualization Engine | Core Feature | 🚧 In Development | Step generator architecture and playback engine (Next Phase) |
| Bubble Sort Interactive Visualizer | Visualization | ⏳ Planned | First active interactive visualizer to be connected |
| Additional Algorithm Visualizers | Visualization | ⏳ Planned | Selection, Insertion, Merge, Quick, Binary Search, etc. |
| Progress Tracking Backend | Backend | ⏳ Planned | Mongoose schema field exists; REST endpoints pending |
| Favorites Backend API | Backend | ⏳ Planned | Mongoose schema field exists; REST endpoints pending |
| Activity History Tracking | Backend | ⏳ Planned | Persistence for user action feed pending |
| User Profile Page Full Implementation | Frontend | ✅ Placeholder | Currently renders `PagePlaceholder` component |
| Social OAuth (Google) | Auth | ⏳ Planned | Schema and UI placeholders ready; OAuth flow pending |
| Production Deployment | DevOps | ⏳ Planned | Cloud hosting and CI/CD pipelines pending |

---

## 6. Application Flow

```text
                                  ┌──────────────────────────┐
                                  │      Public Visitor      │
                                  └─────────────┬────────────┘
                                                │
                                                ▼
                                  ┌──────────────────────────┐
                                  │   Landing Page (Home)    │
                                  └──────┬────────────┬──────┘
                                         │            │
                         ┌───────────────┘            └───────────────┐
                         ▼                                            ▼
           ┌──────────────────────────┐                 ┌──────────────────────────┐
           │      Register Page       │                 │        Login Page        │
           │  (POST /api/auth/register)│                │   (POST /api/auth/login) │
           └─────────────┬────────────┘                 └─────────────┬────────────┘
                         │                                            │
                         └──────────────────┬─────────────────────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │ JWT Set in HTTP-Only Cookie │
                             │  AuthContext Authenticated  │
                             └──────────────┬──────────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │          Dashboard          │
                             │ (/dashboard, ProtectedRoute)│
                             └──────────────┬──────────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │     Algorithms Library      │
                             │  (/algorithms?category=...) │
                             └──────────────┬──────────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │   Algorithm Details Page    │
                             │   (/algorithm/:slug)        │
                             │  - Explanations & Complexity│
                             │  - Multi-Language Code Tabs │
                             │  - Dry Run Walkthrough      │
                             └──────────────┬──────────────┘
                                            │
                                            ▼
                             ┌─────────────────────────────┐
                             │   Visualization Workspace   │
                             │  [Current: UI Placeholder]  │
                             │  [Next: Interactive Engine] │
                             └─────────────────────────────┘
```

---

## 7. Current Architecture

The project follows a decoupled client-server architecture with strict separation between user interface, business logic, state management, and data access.

### 7.1 Frontend Architecture

```text
React 19 Application (client/)
 │
 ├── Entrypoint (main.jsx -> App.jsx)
 │    └── BrowserRouter (React Router DOM v7)
 │         └── AuthProvider (AuthContext.jsx)
 │              └── AppRoutes.jsx
 │
 ├── Routing & Layout Layer
 │    ├── AppLayout (Navbar, Outlet, Footer)
 │    ├── ProtectedRoute (Session validation guard)
 │    └── GuestRoute (Restricts authenticated users)
 │
 ├── Pages Layer
 │    ├── Home, Login, Register
 │    ├── Dashboard (Aggregates dashboard components)
 │    ├── Algorithms (Search, filters, algorithm grid)
 │    ├── AlgorithmDetails (Dynamic :slug renderer)
 │    ├── Profile (Placeholder)
 │    └── NotFound (404 catch-all)
 │
 ├── State & Data Management
 │    ├── AuthContext (User session, token validation, login/logout)
 │    ├── useAlgorithmFilters (URL search param query synchronization)
 │    ├── algorithms.js (Single source of truth for algorithm metadata)
 │    └── dashboardData.js (Structured dashboard data source)
 │
 └── API Services Layer
      └── authService.js (Axios instance configured with credentials)
```

### 7.2 Backend Architecture

```text
Express 5 Server (server/)
 │
 ├── Entrypoint (index.js -> app.js)
 │    ├── dotenv configuration
 │    ├── MongoDB connection (config/db.js)
 │    └── Express application pipeline (src/app.js)
 │
 ├── Global Middleware Pipeline
 │    ├── CORS (Configured for CLIENT_URL with credentials: true)
 │    ├── express.json & express.urlencoded (16kb payload limits)
 │    ├── cookie-parser (Parses JWT from httpOnly cookies)
 │    └── morgan (HTTP request logger)
 │
 ├── Routing Layer
 │    ├── Health Check (GET /health)
 │    └── Auth Router (/api/auth)
 │         ├── POST /register
 │         ├── POST /login
 │         ├── POST /logout  [authenticate middleware]
 │         └── GET  /me      [authenticate middleware]
 │
 ├── Controller & Service Layer
 │    ├── authController.js (Request handling, validation, cookie management)
 │    └── tokenService.js (JWT signing and verification helpers)
 │
 ├── Data Access Layer (Mongoose 9)
 │    └── User.js (Schema, validations, pre-save bcrypt hash, instance methods)
 │
 └── Error Handling Pipeline
      ├── ApiError.js (Standardized error envelope)
      ├── ApiResponse.js (Standardized success envelope)
      ├── asyncHandler.js (Async route wrapper)
      └── errorMiddleware.js (Global error catch handler)
```

---

## 8. Technology Stack

### Frontend Dependencies (`client/package.json`)

| Package | Version | Purpose |
|---|---|---|
| `react` | `^19.2.7` | UI library for declarative component development |
| `react-dom` | `^19.2.7` | DOM renderer for React components |
| `react-router-dom` | `^7.18.1` | Client-side routing, route guards, and URL parameter management |
| `tailwindcss` | `^4.3.2` | Utility-first CSS framework |
| `@tailwindcss/vite` | `^4.3.2` | Official Vite plugin for Tailwind CSS v4 |
| `axios` | `^1.18.1` | Promise-based HTTP client with credential support |
| `lucide-react` | `^1.24.0` | Icon set for UI elements |

#### Frontend Dev Dependencies
- `vite` (`^8.1.1`): Build tool and local development server
- `@vitejs/plugin-react` (`^6.0.3`): Fast Refresh support for React
- `babel-plugin-react-compiler` (`^1.0.0`) & `@rolldown/plugin-babel` (`^0.2.3`): React compiler integration
- `oxlint` (`^1.71.0`): Fast JavaScript/JSX linter

---

### Backend Dependencies (`server/package.json`)

| Package | Version | Purpose |
|---|---|---|
| `express` | `^5.2.1` | Web framework for REST API endpoints and middleware |
| `mongoose` | `^9.7.4` | Object Data Modeling (ODM) library for MongoDB |
| `jsonwebtoken` | `^9.0.3` | JSON Web Token implementation for authentication |
| `bcrypt` | `^6.0.0` | Password hashing and comparison library |
| `cookie-parser` | `^1.4.7` | Middleware for parsing HTTP request cookies |
| `cors` | `^2.8.6` | Cross-Origin Resource Sharing middleware |
| `dotenv` | `^17.4.2` | Loads environment variables from `.env` files |
| `morgan` | `^1.11.0` | HTTP request logger for development diagnostics |
| `validator` | `^13.15.35` | String validation and sanitization helpers |

#### Backend Dev Dependencies
- `nodemon` (`^3.0.2`): Automatically restarts Node.js server upon file changes

---

## 9. Project Structure

```text
Algovita/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/                      # Static assets and media
│   │   ├── components/
│   │   │   ├── algorithm/               # Components specific to Algorithm Details
│   │   │   │   ├── AlgorithmExplanation.jsx
│   │   │   │   ├── AlgorithmHeader.jsx
│   │   │   │   ├── AlgorithmOverview.jsx
│   │   │   │   ├── BottomNavigation.jsx
│   │   │   │   ├── CodeSection.jsx
│   │   │   │   ├── ComplexityCard.jsx
│   │   │   │   ├── CustomInputPanel.jsx
│   │   │   │   ├── DryRunSection.jsx
│   │   │   │   ├── LearningActions.jsx
│   │   │   │   ├── PracticeSection.jsx
│   │   │   │   ├── RelatedAlgorithms.jsx
│   │   │   │   ├── StepExplanation.jsx
│   │   │   │   ├── VisualizationControls.jsx
│   │   │   │   └── VisualizationWorkspace.jsx
│   │   │   ├── algorithms/              # Components for Algorithms Library page
│   │   │   │   ├── AlgorithmCard.jsx
│   │   │   │   ├── AlgorithmEmptyState.jsx
│   │   │   │   ├── AlgorithmFilters.jsx
│   │   │   │   ├── AlgorithmGrid.jsx
│   │   │   │   ├── AlgorithmSearch.jsx
│   │   │   │   └── CategoryFilter.jsx
│   │   │   ├── common/                  # Reusable guards, toasts, placeholders
│   │   │   │   ├── GuestRoute.jsx
│   │   │   │   ├── PagePlaceholder.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── dashboard/               # Components for Dashboard page
│   │   │   │   ├── AlgorithmCard.jsx
│   │   │   │   ├── CategoryCard.jsx
│   │   │   │   ├── CategoryGrid.jsx
│   │   │   │   ├── ContinueLearningCard.jsx
│   │   │   │   ├── DashboardCTA.jsx
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   ├── FavoritesList.jsx
│   │   │   │   ├── LearningJourney.jsx
│   │   │   │   ├── LearningOverview.jsx
│   │   │   │   ├── ProgressCard.jsx
│   │   │   │   ├── RecentActivity.jsx
│   │   │   │   ├── RecommendedAlgorithms.jsx
│   │   │   │   └── difficultyStyles.js
│   │   │   ├── layout/                  # Global layout shell
│   │   │   │   ├── AppLayout.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── ui/                      # Generic primitive UI elements
│   │   │   └── visualizer/              # Dedicated visualizer canvas components (Upcoming)
│   │   ├── constants/
│   │   │   └── dashboardData.js         # Structured dashboard mock data & categories
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # React Context for authentication state
│   │   ├── data/
│   │   │   └── algorithms.js            # Single source of truth for algorithm metadata
│   │   ├── hooks/
│   │   │   └── useAlgorithmFilters.js   # Filter and search synchronization hook
│   │   ├── pages/
│   │   │   ├── AlgorithmDetails/        # Dynamic :slug algorithm detail view
│   │   │   │   ├── AlgorithmDetailsPage.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── Algorithms/              # Searchable algorithm catalog view
│   │   │   │   ├── AlgorithmsPage.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── Dashboard/               # Authenticated user dashboard view
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   └── index.jsx
│   │   │   ├── Home/                    # Landing page view
│   │   │   │   ├── CategoriesSection.jsx
│   │   │   │   ├── CTASection.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   ├── PopularAlgorithmsSection.jsx
│   │   │   │   ├── StatisticsSection.jsx
│   │   │   │   └── WhyChooseUsSection.jsx
│   │   │   ├── Login/                   # User login view
│   │   │   │   ├── index.jsx
│   │   │   │   └── LoginForm.jsx
│   │   │   ├── NotFound/                # 404 error fallback view
│   │   │   │   └── index.jsx
│   │   │   ├── Profile/                 # User profile view (Placeholder)
│   │   │   │   └── index.jsx
│   │   │   └── Register/                # User registration view
│   │   │       ├── FeaturePanel.jsx
│   │   │       ├── index.jsx
│   │   │       ├── InputField.jsx
│   │   │       ├── PasswordStrength.jsx
│   │   │       ├── RegisterForm.jsx
│   │   │       ├── SocialLogin.jsx
│   │   │       └── TermsCheckbox.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx            # Application route definitions
│   │   ├── services/
│   │   │   └── authService.js           # Axios API wrapper for auth endpoints
│   │   ├── utils/
│   │   │   └── filterAlgorithms.js      # Filter, search, and sort helper algorithms
│   │   ├── App.jsx                      # App root component
│   │   ├── index.css                    # Tailwind CSS imports & global rules
│   │   └── main.jsx                     # React DOM bootstrap
│   ├── .env.example                     # Client environment template
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # MongoDB connection logic
│   │   ├── controllers/
│   │   │   └── authController.js        # Controller handlers (register, login, logout, me)
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js        # authenticate & authorize JWT guards
│   │   │   └── errorMiddleware.js       # Centralized error handler
│   │   ├── models/
│   │   │   └── User.js                  # Mongoose User model with bcrypt hooks
│   │   ├── routes/
│   │   │   └── authRoutes.js            # Auth route registrations
│   │   ├── services/
│   │   │   └── tokenService.js          # JWT creation and verification service
│   │   ├── utils/
│   │   │   ├── ApiError.js              # Custom Error subclass
│   │   │   ├── ApiResponse.js           # Structured JSON response wrapper
│   │   │   └── asyncHandler.js          # Async controller wrapper
│   │   ├── validators/
│   │   │   └── authValidator.js         # Input validation helper functions
│   │   └── app.js                       # Express app configuration
│   ├── .env.example                     # Server environment template
│   ├── .gitignore
│   ├── index.js                         # Server entrypoint and port listener
│   └── package.json
│
├── README.md                            # Comprehensive project documentation
└── .gitignore
```

---

## 10. Authentication System

The authentication architecture is built around secure, stateless JSON Web Tokens delivered over HTTP-only cookies to eliminate XSS token theft vectors.

```text
                        ┌──────────────────────────────────────────────┐
                        │              REGISTRATION FLOW               │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                              User submits Full Name, Username,
                                 Email, Password & Confirm
                                               │
                                               ▼
                                   POST /api/auth/register
                                               │
                                               ▼
                                 Server-side validation check
                                  (Format, length, password)
                                               │
                                               ▼
                                  Check duplicate email/user
                                               │
                                               ▼
                                   Hash password with bcrypt
                                  (10 salt rounds in pre-save)
                                               │
                                               ▼
                                     Save User to MongoDB
                                               │
                                               ▼
                                Sign JWT (7-day default expiry)
                                               │
                                               ▼
                              Set accessToken HTTP-Only Cookie
                                  & Return User JSON (201)
```

```text
                        ┌──────────────────────────────────────────────┐
                        │                  LOGIN FLOW                  │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                                 User enters Email, Password,
                                      and "Remember Me"
                                               │
                                               ▼
                                     POST /api/auth/login
                                               │
                                               ▼
                                   Find User in DB by email
                                     (.select('+password'))
                                               │
                                               ▼
                                   Verify bcrypt password hash
                                               │
                                               ▼
                                Update user.lastLogin timestamp
                                               │
                                               ▼
                                   Generate JWT Access Token:
                                 - Remember Me ON  : 30-day token
                                 - Remember Me OFF : 1-day token
                                               │
                                               ▼
                              Set accessToken HTTP-Only Cookie
                                (SameSite: Lax, Secure in prod)
                                               │
                                               ▼
                                  Return User JSON data (200)
```

```text
                        ┌──────────────────────────────────────────────┐
                        │          SESSION PERSISTENCE FLOW            │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                                  App boots in browser (main.jsx)
                                               │
                                               ▼
                                 AuthContext triggers checkAuth()
                                               │
                                               ▼
                                       GET /api/auth/me
                                 (Cookie automatically attached)
                                               │
                                               ▼
                                   authMiddleware verifies JWT
                                               │
                                               ▼
                                 Lookup User by decoded userId
                                               │
                                               ▼
                                Return User Data -> AuthContext sets
                                user state & isAuthenticated = true
```

### Security Principles Enforced
1. **No Plaintext Passwords:** Passwords are salted and hashed with `bcrypt` (10 rounds).
2. **Password Leakage Prevention:** The password field is configured with `select: false` in the Mongoose schema and is explicitly removed in `toJSON()`.
3. **No `localStorage` Token Storage:** Tokens are stored exclusively in HTTP-only, SameSite cookies.
4. **Credential Isolation:** Client-side Axios instance uses `withCredentials: true` to scope cookie dispatch strictly to API origins.
5. **Backend Authorization:** Route guards (`ProtectedRoute`) protect frontend routes; backend endpoints use `authenticate` middleware to verify identity independently.

---

## 11. Dashboard

The Dashboard provides authenticated learners with an organized learning command center.

### Dashboard Sections
- **Welcome Banner:** Greets the user with their account name (`user.fullName` or `user.username`).
- **Learning Metrics Overview:** Four high-level metric cards:
  - *Completed Algorithms:* Count of completed topics.
  - *In Progress:* Count of algorithms currently being studied.
  - *Learning Progress:* Overall percentage progress indicator.
  - *Favorites:* Count of saved topics.
- **Progress Card:** Detailed milestone indicator encouraging regular study habits.
- **Continue Learning:** Quick-launch card for the active algorithm (currently linked to Bubble Sort).
- **Topic Categories Grid:** 10 structured category cards with algorithm count badges.
- **Recommended Algorithms:** Curated algorithm cards for fast discovery.
- **Recent Activity Feed & Favorites List:** Snapshot lists of recent user actions and bookmarked algorithms.
- **Learning Journey Roadmap:** Milestone timeline spanning Arrays through Dynamic Programming.

> **Data Source Notice:** All metric counts, progress percentages, favorites, and recent activity items on the dashboard are currently loaded from `src/constants/dashboardData.js`. Backend database persistence for user progress, saved favorites, and event logging will be implemented in an upcoming milestone.

---

## 12. Algorithms Library

The Algorithms Library (`/algorithms`) acts as the interactive directory for all supported and planned algorithms.

```text
   ┌─────────────────────────────────────────────────────────────────┐
   │                       Algorithms Library                        │
   │                                                                 │
   │  ┌───────────────────────────────────────────────────────────┐  │
   │  │ Search Bar: "bubble", "sort", "graph"...                  │  │
   │  └───────────────────────────────────────────────────────────┘  │
   │                                                                 │
   │  Categories: [ All ] [ Sorting ] [ Searching ] [ Trees ] ...    │
   │  Filters   : Difficulty [All/Easy/Med/Hard] | Status [All/...]  │
   │  Sort By   : [ Recommended / Alphabetical / Difficulty / Time ] │
   │                                                                 │
   │  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
   │  │   Bubble Sort    │  │  Selection Sort  │  │  Merge Sort   │  │
   │  │   [ Available ]  │  │  [Coming Soon]   │  │ [Coming Soon] │  │
   │  │   Easy • 10 min  │  │  Easy • 12 min   │  │ Med • 15 min  │  │
   │  └────────┬─────────┘  └──────────────────┘  └───────────────┘  │
   └───────────┼─────────────────────────────────────────────────────┘
               │ Click Card
               ▼
   /algorithm/bubble-sort
```

### Key Architectural Details
- **Single Source of Truth:** Algorithm data is defined in `src/data/algorithms.js`.
- **URL Parameter Sync:** Using `useSearchParams`, filter choices (`category`, `difficulty`, `status`, `sort`, `search`) are reflected in the browser URL. Sharing or refreshing `/algorithms?category=sorting&difficulty=Easy` preserves exact filter states.
- **Dynamic Counter:** Displays the number of matches currently displayed out of the total library count.
- **Empty State Fallback:** If no algorithms match the active query/filters, a helpful empty state with a reset action is shown.

---

## 13. Algorithm Details Page

Located at `/algorithm/:slug`, this page presents comprehensive technical and educational resources for any selected algorithm.

### Page Components & Content
1. **Algorithm Header:** Title, category badge, difficulty badge, estimated time, and client-side interactive Favorite & Mark Complete toggle buttons.
2. **Algorithm Overview:** Highlights what the algorithm is, practical scenarios for when to use it, and the foundational concept.
3. **Visualization Workspace (Placeholder):** Renders a visual preview bar chart and status banner.
4. **Visualization Controls (Placeholder):** Playback control buttons (Previous, Play, Pause, Next, Restart) and a speed dropdown (0.5x, 1x, 1.5x, 2x) rendered in a disabled state.
5. **Custom Input Panel (Placeholder):** Input box allowing custom data input.
6. **Step Explanation:** Displays step-by-step contextual annotations for execution stages.
7. **Detailed Explanation:** Sections for *How It Works*, *Step-by-Step Breakdown*, *When to Use*, *Advantages*, and *Disadvantages*.
8. **Complexity Analysis Card:** Tabular view of Best Case, Average Case, Worst Case time complexities and Auxiliary Space Complexity.
9. **Multi-Language Code Tabs:** Formatted implementations in **JavaScript**, **Python**, **Java**, and **C++** with copy-to-clipboard functionality.
10. **Dry Run Walkthrough:** Step-by-step state trace table demonstrating value comparisons and swaps.
11. **Practice Problems:** Curated external links (e.g., LeetCode problem sets) and internal practice suggestions.
12. **Related Algorithms & Bottom Navigation:** Links to related techniques and pagination to navigate through the algorithm catalog.
13. **Error Handling:** Graceful fallback to `NotFound` for invalid slugs.
14. **Status Handling:** Visible "Coming Soon" banner for algorithms pending visualizer implementation.

---

## 14. Visualization Architecture Status

```text
                       TARGET VISUALIZATION ARCHITECTURE
                       
 ┌───────────────────────────┐         ┌───────────────────────────────┐
 │     Algorithm Input       │  ────►  │   Algorithm Step Generator    │
 │ (Default or Custom Array) │         │ (Pure JS function, no DOM/UI) │
 └───────────────────────────┘         └───────────────┬───────────────┘
                                                       │
                                                       ▼
                                       ┌───────────────────────────────┐
                                       │   Array of Snapshot Objects   │
                                       │   [{ type, indices, state }]  │
                                       └───────────────┬───────────────┘
                                                       │
                                                       ▼
 ┌───────────────────────────┐         ┌───────────────────────────────┐
 │   Visualization Engine    │  ◄────  │    Playback State Manager     │
 │  - Step Pointer (Index)   │         │  - Play / Pause / Step Next   │
 │  - Timer / Speed Interval │         │  - Step Previous / Reset      │
 └─────────────┬─────────────┘         └───────────────────────────────┘
               │
               ▼
 ┌───────────────────────────┐         ┌───────────────────────────────┐
 │    Visualizer Renderer    │  ────►  │       Step Explanation        │
 │  (SVG / Bars / Nodes / CSS)│        │   (Text describing snapshot)  │
 └───────────────────────────┘         └───────────────────────────────┘
```

### Current Status
- **UI Workspace & Controls:** ✅ Implemented as a polished UI layout with static previews and disabled playback controls.
- **Execution & Step Engine:** 🚧 Under active design. The step generator and interactive animation loops are scheduled as the immediate next phase of development.

---

## 15. Visualization Development Principles

When implementing interactive visualizers, all developers must adhere to the following architectural rules:

1. **Decouple Algorithm Logic from UI Animation:**
   Never execute sorting loops or sleep delays directly inside React component bodies or render hooks.
2. **Pure Step Generators:**
   Algorithms should be implemented as pure functions that receive input data and return an array of discrete step objects:
   ```javascript
   // Example Step Data Structure
   {
     stepIndex: 2,
     type: 'COMPARE',           // 'COMPARE' | 'SWAP' | 'OVERWRITE' | 'HIGHLIGHT' | 'SORTED'
     indices: [0, 1],
     arrayState: [30, 50, 80, 10],
     explanation: 'Comparing 50 and 30. Since 50 > 30, a swap is required.'
   }
   ```
3. **Deterministic State Machine:**
   The visualization engine must be a deterministic state machine driven by a step index pointer (`currentStep`). This ensures that *Next*, *Previous*, *Pause*, and *Jump-to-Step* operate reliably without side effects.
4. **Reusability:**
   Array bar renderers, node graphs, and pointer indicators should be built as generic visualizer primitives shared across algorithms.

---

## 16. Supported Algorithms

The following algorithms are cataloged in `src/data/algorithms.js`:

| Algorithm | Category | Difficulty | Estimated Time | Implementation Status |
|---|---|---|---|---|
| **Bubble Sort** | Sorting | Easy | 10 min | ✅ Available (Visualizer Next) |
| **Selection Sort** | Sorting | Easy | 12 min | ⏳ Coming Soon |
| **Insertion Sort** | Sorting | Easy | 12 min | ⏳ Coming Soon |
| **Merge Sort** | Sorting | Medium | 15 min | ⏳ Coming Soon |
| **Quick Sort** | Sorting | Medium | 18 min | ⏳ Coming Soon |
| **Linear Search** | Searching | Easy | 8 min | ⏳ Coming Soon |
| **Binary Search** | Searching | Easy | 10 min | ⏳ Coming Soon |
| **Stack** | Data Structures | Easy | 10 min | ⏳ Coming Soon |
| **Queue** | Data Structures | Easy | 10 min | ⏳ Coming Soon |
| **Linked List** | Data Structures | Medium | 14 min | ⏳ Coming Soon |
| **Binary Search Tree** | Trees | Medium | 16 min | ⏳ Coming Soon |
| **Tree Traversal** | Trees | Medium | 14 min | ⏳ Coming Soon |
| **Breadth-First Search (BFS)** | Graphs | Medium | 15 min | ⏳ Coming Soon |
| **Depth-First Search (DFS)** | Graphs | Medium | 15 min | ⏳ Coming Soon |
| **Dijkstra's Algorithm** | Graphs | Hard | 20 min | ⏳ Coming Soon |

---

## 17. Current MVP Scope

### In Scope (Current MVP Delivery)
- ✅ Complete user authentication (register, login, session persistence, logout, protected routes).
- ✅ Dynamic, authentication-aware global navigation shell.
- ✅ Landing page presenting features, categories, workflow, and platform highlights.
- ✅ Dashboard UI with personalized greeting, learning metrics, and category navigation.
- ✅ Searchable, filterable Algorithms Library with URL query parameter synchronization.
- ✅ Algorithm Details page with explanations, multi-language code snippets, complexity analysis, and dry runs.
- 🚧 Interactive step-by-step Bubble Sort visualizer with complete playback controls.

### Out of Scope (Deferred to Later Milestones)
- ❌ Third-party OAuth integrations (Google/GitHub login).
- ❌ In-browser multi-language code execution/compiler sandboxes.
- ❌ Real-time multiplayer collaborative learning or chat rooms.
- ❌ AI-powered automated code reviewers or chat assistants.
- ❌ Certificate generation and gamified token economies.

---

## 18. Future Roadmap

```text
┌─────────────────────────┐
│ Phase 1: Core Platform  │  ==> MERN Setup, Auth, JWT Cookies, Route Guards, Landing Page [COMPLETED]
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Phase 2: Learning Hub   │  ==> Dashboard UI, Library, Algorithm Details, Code Tabs [COMPLETED]
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Phase 3: Visualizer Core│  ==> Step Generator Engine, Play/Pause/Step Controls, Custom Input [NEXT]
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Phase 4: More Visuals   │  ==> Selection, Insertion, Merge, Quick, Binary Search, Trees, Graphs
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Phase 5: Persistence    │  ==> Database-backed Progress Tracking, Saved Favorites, Activity Logs
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Phase 6: Advanced Tools │  ==> Interactive Quizzes, Custom Problem Submissions, Dark/Light Themes
└─────────────────────────┘
```

---

## 19. Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.x` or higher recommended)
- [npm](https://www.npmjs.com/) (version `9.x` or higher)
- [MongoDB](https://www.mongodb.com/) (local instance running on port `27017` or a MongoDB Atlas URI)

### Clone the Repository
```bash
git clone <repository-url>
cd Algovita
```

### Install Dependencies

#### 1. Backend Setup
```bash
cd server
npm install
```

#### 2. Frontend Setup
```bash
cd ../client
npm install
```

---

## 20. Environment Variables

### Frontend (`client/.env`)
Create a `.env` file in the `client/` directory based on `client/.env.example`:

```env
# URL pointing to the Express backend API
VITE_API_URL=http://localhost:5000/api
```

### Backend (`server/.env`)
Create a `.env` file in the `server/` directory based on `server/.env.example`:

```env
# Server Port
PORT=5000

# Environment Mode
NODE_ENV=development

# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/dsa-visualizer

# JWT Secrets (replace with strong random strings in production)
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_change_in_production

# Frontend Client URL for CORS Whitelisting
CLIENT_URL=http://localhost:5173
```

---

## 21. Running the Project

Run the backend and frontend in separate terminal windows.

### Terminal 1: Start Backend Server
```bash
cd server
npm run dev
```
*The server will start at `http://localhost:5000` and establish a connection to MongoDB.*

### Terminal 2: Start Frontend Client
```bash
cd client
npm run dev
```
*The Vite development server will start at `http://localhost:5173`.*

---

## 22. Available Scripts

### Frontend Scripts (`client/package.json`)

| Command | Action |
|---|---|
| `npm run dev` | Launches the local Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Builds optimized production assets to `client/dist` |
| `npm run lint` | Runs `oxlint` for rapid linting and code quality validation |
| `npm run preview` | Locally serves the production build from `client/dist` |

### Backend Scripts (`server/package.json`)

| Command | Action |
|---|---|
| `npm run dev` | Starts the Express server under `nodemon` with automatic reload on changes |
| `npm test` | Placeholder test runner script |

---

## 23. API & Backend Overview

Base URL: `http://localhost:5000`

### 23.1 Health Check

#### `GET /health`
- **Purpose:** Diagnostic endpoint to verify server availability.
- **Authentication:** Public (No token required).
- **Response (200 OK):**
  ```json
  {
    "message": "Server is running"
  }
  ```

---

### 23.2 Authentication Endpoints

#### `POST /api/auth/register`
- **Purpose:** Create a new user account and initiate an authenticated session.
- **Authentication:** Public.
- **Request Body:**
  ```json
  {
    "fullName": "Jane Doe",
    "username": "janedoe",
    "email": "jane@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "statusCode": 201,
    "data": {
      "user": {
        "_id": "65b...",
        "fullName": "Jane Doe",
        "username": "janedoe",
        "email": "jane@example.com",
        "role": "user",
        "avatar": null,
        "provider": "email",
        "progress": {},
        "favorites": [],
        "createdAt": "2026-08-16T12:00:00.000Z",
        "updatedAt": "2026-08-16T12:00:00.000Z"
      },
      "accessToken": "eyJhbGciOi..."
    },
    "message": "User registered successfully",
    "success": true
  }
  ```
- **Cookies Set:** `accessToken` (HTTP-only, 7-day expiration).

---

#### `POST /api/auth/login`
- **Purpose:** Authenticate an existing user with credentials.
- **Authentication:** Public.
- **Request Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!",
    "rememberMe": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "data": {
      "user": {
        "_id": "65b...",
        "fullName": "Jane Doe",
        "username": "janedoe",
        "email": "jane@example.com",
        "role": "user"
      }
    },
    "message": "Logged in successfully",
    "success": true
  }
  ```
- **Cookies Set:** `accessToken` (HTTP-only, 30 days if `rememberMe` is true; 1 day if false).

---

#### `POST /api/auth/logout`
- **Purpose:** Terminate the active authenticated session.
- **Authentication:** Protected (Requires valid `accessToken` cookie or Bearer token).
- **Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "data": {},
    "message": "Logged out successfully",
    "success": true
  }
  ```
- **Cookies Cleared:** `accessToken`.

---

#### `GET /api/auth/me`
- **Purpose:** Retrieve the profile and session state of the currently authenticated user.
- **Authentication:** Protected (Requires valid `accessToken` cookie or Bearer token).
- **Response (200 OK):**
  ```json
  {
    "statusCode": 200,
    "data": {
      "user": {
        "_id": "65b...",
        "fullName": "Jane Doe",
        "username": "janedoe",
        "email": "jane@example.com",
        "role": "user",
        "progress": {},
        "favorites": []
      }
    },
    "message": "User retrieved successfully",
    "success": true
  }
  ```

---

## 24. Development Guidelines

1. **Centralize Shared Data:** Maintain `src/data/algorithms.js` as the single source of truth for algorithm metadata. Do not hardcode duplicate algorithm lists across page components.
2. **Encapsulate Authentication:** Perform all login, registration, session validation, and logout interactions through `AuthContext` and `authService.js`.
3. **Preserve HTTP-Only Security:** Never store JWT access tokens or raw user credentials in `localStorage` or `sessionStorage`.
4. **Decouple Visualizers:** Keep algorithm step generation independent of React rendering lifecycles.
5. **Use Standardized API Envelopes:** All backend controllers must return responses wrapped in `ApiResponse` and throw errors via `ApiError`.
6. **Protect Secrets:** Never commit `.env` files containing real secrets, database URIs, or token signing keys.

---

## 25. Git Workflow

We recommend using feature branches and concise semantic commit messages:

```bash
# 1. Create a feature branch from main
git checkout -b feat/bubble-sort-visualizer

# 2. Make changes and verify linting/build
npm run lint
npm run build

# 3. Stage and commit changes
git add .
git commit -m "feat(visualizer): implement step generator for bubble sort"

# 4. Push to remote and open a Pull Request
git push origin feat/bubble-sort-visualizer
```

### Commit Message Conventions
- `feat:` Adds a new user-facing feature or API endpoint
- `fix:` Resolves a bug or functional regression
- `refactor:` Code refactoring without behavioral changes
- `docs:` Documentation updates or additions
- `style:` Code style, formatting, or CSS adjustments
- `test:` Adding or correcting tests

---

## 26. Testing Checklist

Use this checklist to verify application integrity during development and before pull requests:

### Authentication & Sessions
- [ ] User can register with valid credentials.
- [ ] Registration rejects mismatched passwords, weak passwords, and duplicate emails/usernames.
- [ ] User can log in with correct credentials and receives an HTTP-only cookie.
- [ ] "Remember Me" toggle appropriately sets token expiration (30 days vs 1 day).
- [ ] Refreshing the page keeps authenticated users logged in.
- [ ] Unauthenticated users are redirected from `/dashboard` and `/profile` to `/login`.
- [ ] Authenticated users are redirected from `/login` and `/register` to `/dashboard`.
- [ ] Logging out clears the authentication cookie and resets state.

### Algorithms Catalog & Filtering
- [ ] Searching by keyword updates results in real-time.
- [ ] Filtering by category, difficulty, or status correctly filters displayed algorithms.
- [ ] Changing filters updates the URL query string.
- [ ] Navigating to a direct URL with parameters (`/algorithms?category=sorting`) loads matching cards.
- [ ] "Clear Filters" button in the empty state resets all filters.

### Algorithm Details
- [ ] Navigating to `/algorithm/bubble-sort` renders complete explanations, complexity cards, and code snippets.
- [ ] Switching code tabs displays JavaScript, Python, Java, and C++ implementations.
- [ ] Clicking "Copy Code" copies snippet text to the clipboard.
- [ ] Navigating to an invalid slug (e.g., `/algorithm/invalid-name`) renders the 404 page.
- [ ] Coming soon algorithms display the appropriate informational banner.

### Build & Code Health
- [ ] `npm run lint` executes in `client/` without unaddressed errors.
- [ ] `npm run build` completes in `client/` without bundle errors.
- [ ] Backend server boots cleanly and connects to MongoDB without runtime exceptions.

---

## 27. Known Limitations

- **Visualization Engine in Development:** Visualizer workspaces currently render a static layout preview. Interactive playback, step jumping, and animation loops are pending the completion of the step generator engine.
- **Dashboard Data Persistence:** Dashboard progress meters, completed algorithm counts, favorites, and recent activities currently read from static mock structures (`dashboardData.js`).
- **Profile Page:** The `/profile` route renders a placeholder UI.
- **Social Authentication:** Google and GitHub OAuth options on the authentication forms are UI placeholders not yet linked to active OAuth provider client IDs.

---

## 28. Future Improvements

- **Interactive Visualizers:** Implementation of step engines for all 15 cataloged algorithms.
- **Database-Backed Progress:** Storing per-user completion records, time spent, and bookmark state in MongoDB.
- **Custom Visualizer Inputs:** Parsing user-submitted arrays, strings, and graph adjacency matrices for visualization.
- **Interactive Quizzes:** Formative multiple-choice questions assessing algorithmic understanding.
- **In-Browser Code Sandbox:** Code editors allowing learners to write algorithms and run automated tests against custom test cases.
- **Dark/Light Theme Toggle:** Configurable UI color schemes.

---

## 29. Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "feat: add your feature"`.
4. Ensure code passes lint checks: `npm run lint`.
5. Push to your fork: `git push origin feature/your-feature-name`.
6. Open a **Pull Request** with a detailed explanation of your changes.

---

## 30. License

License: Not yet defined.

---

## 31. Author

Author: Mohd swahil
