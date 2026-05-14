# FinanceTracker — Backend

A RESTful API built with Node.js, Express, and PostgreSQL (Prisma ORM) for the Personal Finance & Budget Tracking Application.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Password Hashing:** bcryptjs

## Project Structure
backend/
├── prisma/
│   ├── schema.prisma        # Database schema & models
│   └── migrations/          # Auto-generated migrations
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   ├── budgetController.js
│   │   └── categoryController.js
│   ├── routes/              # API route definitions
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── budgetRoutes.js
│   │   └── categoryRoutes.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── validate.middleware.js
│   ├── validators/          # Zod validation schemas
│   │   ├── auth.validator.js
│   │   ├── transaction.validator.js
│   │   ├── budget.validator.js
│   │   └── category.validator.js
│   └── app.js               # Express app entry point
├── .env                     # Environment variables
├── .env.example             # Example environment file
├── .gitignore
└── package.json

## Prerequisites

- Node.js v18+
- PostgreSQL v14+
- npm v9+

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

### 4. Setup the database

Make sure PostgreSQL is running and the database exists:

```sql
CREATE DATABASE "FinanceTracker";
```

### 5. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 6. Run the backend server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start at: `http://localhost:5000`

---

## API Endpoints

### Auth
| Method    | Endpoint             | Description                  |
|-----------|----------------------|------------------------------|
| POST      | `/api/auth/register` | Register new user            |
| POST      | `/api/auth/login`    | Login user                   |
| GET       | `/api/auth/me`       | Get current user (Protected) |

### Transactions
| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/transactions`     | Get all transactions (with filters) |
| GET    | `/api/transactions/:id` | Get single transaction              |
| POST   | `/api/transactions`     | Create transaction                  |
| PUT    | `/api/transactions/:id` | Update transaction                  |
| DELETE | `/api/transactions/:id` | Delete transaction                  |

### Budgets
| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| GET    | `/api/budgets`     | Get all budgets with spending |
| POST   | `/api/budgets`     | Create budget                 |
| PUT    | `/api/budgets/:id` | Update budget                 |
| DELETE | `/api/budgets/:id` | Delete budget                 |


## Authentication

All protected routes require a Bearer token in the Authorization header

## Database Schema

User ──< Transaction
User ──< Budget
User ──< Category
Category ──< Transaction
Category ──< Budget

