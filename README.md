# NEO-BRUTAL TRACKER v4.4 // LIMIT_FLUX

A personal finance tracking application with a neo-brutalist design aesthetic. Track income, expenses, and visualize your financial runway with style.

![Neo-Brutalist Design](https://img.shields.io/badge/Design-Neo--Brutalist-black?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge)

---

## 🚀 Features

### Financial Tracking

- **Income & Expense Logging** — Track all your transactions with descriptions and amounts
- **Budget Cap** — Set monthly spending limits to control your finances
- **Real-time Balance** — See your net worth at a glance

### Analytics & Insights

- **Limit Flux Graph** — Visual chart showing cumulative income vs expenses over time
- **Runway Calculator** — Estimate how many days your funds will last based on your budget
- **Life Hours Impact** — Convert net expenses into work hours based on your hourly wage

### User Experience

- **Neo-Brutalist Design** — Bold, striking UI with sharp edges and vibrant colors
- **Cloud Sync** — Your data is automatically saved to MongoDB when logged in
- **Offline Fallback** — Works with localStorage when not authenticated
- **Documentation Page** — Built-in user guide accessible from the navbar

---

## 🏗️ Tech Stack

### Frontend

- **React 19** — UI framework with hooks
- **Vite** — Fast development server and bundler
- **Vanilla CSS** — Custom neo-brutalist design system

### Backend

- **Express.js** — REST API server
- **MongoDB + Mongoose** — Database and ODM
- **JWT** — JSON Web Token authentication
- **bcryptjs** — Password hashing with salt

---

## 📁 Project Structure

```
neo-brutal-tracker/
├── src/                          # Frontend React app
│   ├── components/
│   │   ├── Header.jsx            # App header
│   │   ├── CommandPanel.jsx      # Left sidebar with action buttons
│   │   ├── StatsGrid.jsx         # Income/Expense/Balance stats
│   │   ├── FluxChart.jsx         # Canvas-based line chart
│   │   ├── TransactionLogs.jsx   # Expandable transaction history
│   │   ├── MetricsPanel.jsx      # Runway & life hours widgets
│   │   ├── Modal.jsx             # Reusable modal component
│   │   ├── BudgetModal.jsx       # Budget setting modal
│   │   ├── WageModal.jsx         # Hourly wage modal
│   │   ├── TransactionModal.jsx  # Income/expense entry modal
│   │   ├── LoginPage.jsx         # Authentication login
│   │   ├── RegisterPage.jsx      # User registration
│   │   └── DocsPage.jsx          # Documentation page
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication state management
│   │   └── TrackerContext.jsx    # Tracker data state with API sync
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # React entry point
│   └── index.css                 # All styles
│
├── server/                       # Backend Express app
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt
│   │   └── TrackerData.js        # Budget, wage, transactions schema
│   ├── routes/
│   │   ├── auth.js               # /api/auth/* routes
│   │   └── tracker.js            # /api/tracker/* routes
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   └── index.js                  # Server entry point
│
├── .env                          # Environment variables (not in git)
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
cd "The Real Tracker"
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/neo-brutal-tracker
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
```

### 3. Start Development

```bash
# Run both frontend and backend
npm run dev:all

# Or run separately:
npm run dev      # Frontend only (Vite)
npm run server   # Backend only (Express)
```

### 4. Access the App

- **Frontend**: http://localhost:5173 (or 5174 if 5173 is busy)
- **Backend API**: http://localhost:3000

---

## 🔐 API Endpoints

### Authentication

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Create new user              |
| POST   | `/api/auth/login`    | Login & get JWT              |
| GET    | `/api/auth/me`       | Get current user (protected) |

### Tracker Data (Protected)

| Method | Endpoint                       | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| GET    | `/api/tracker`                 | Get user's tracker data           |
| PUT    | `/api/tracker`                 | Update budget, wage, transactions |
| POST   | `/api/tracker/transaction`     | Add single transaction            |
| DELETE | `/api/tracker/transaction/:id` | Delete transaction                |

---

## 🎨 Design System

### Colors

| Variable        | Color              | Usage             |
| --------------- | ------------------ | ----------------- |
| `--c-primary`   | #FFDE59 (Yellow)   | Budget, warnings  |
| `--c-secondary` | #FF5757 (Red)      | Expenses, logout  |
| `--c-accent`    | #00E5FF (Cyan)     | Brand, highlights |
| `--c-success`   | #C0FF00 (Lime)     | Income, positive  |
| `--c-grim`      | #D0A9F5 (Lavender) | Special actions   |

### Typography

- **Display**: Arial Black (headings)
- **Mono**: Courier New (body, code)

### Design Elements

- 4px solid black borders
- 8px offset box shadows
- Dotted grid background pattern
- Sharp, no-rounded corners

---

## 📊 Dashboard Metrics Explained

### Runway Days

```
Runway = Net Balance / (Monthly Budget / 30)
```

- **∞** — No budget set or zero expenses
- **Green (>30 days)** — Healthy runway
- **Yellow (7-30 days)** — Caution
- **Red (<7 days)** — Critical

### Life Hours Impact

```
Hours = (Total Expenses - Total Income) / Hourly Wage
```

- **Negative** — You've earned more than spent (green card)
- **Positive** — You've spent more than earned (dark card)

---

## 🔒 Security

- Passwords hashed with **bcrypt** (10 salt rounds)
- JWT tokens expire in **7 days**
- CORS configured for localhost origins
- Environment variables for sensitive data
- `.env` excluded from git

---

## 📝 Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start Vite dev server               |
| `npm run server`  | Start Express backend               |
| `npm run dev:all` | Run frontend + backend concurrently |
| `npm run build`   | Build for production                |
| `npm run preview` | Preview production build            |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Feel free to use and modify.

---

**Built with ❤️ and a neo-brutalist aesthetic**
