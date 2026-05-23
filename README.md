# DevPulse 🚼

### Internal Tech Issue & Feature Tracker API

A collaborative backend platform for software teams to report bugs, suggest features, and manage issue workflows with role-based access control.

---

## 🚀 Live Server

```bash
https://dev-pulse-b7a2.vercel.app
```

---

# 📌 Features

* User Authentication with JWT
* Role-Based Authorization
* Contributor & Maintainer Roles
* Create Bug Reports & Feature Requests
* Update & Delete Issue Management
* Filter & Sort Issues
* PostgreSQL Database Integration
* Raw SQL Queries using `pg`
* Modular Express Architecture
* Global Error Handling
* TypeScript Strict Typing
* Secure Password Hashing with bcrypt

---

# 🛠️ Tech Stack

| Technology   | Usage                     |
| ------------ | ------------------------- |
| Node.js      | Backend runtime           |
| TypeScript   | Type safety               |
| Express.js   | REST API framework        |
| PostgreSQL   | Relational database       |
| pg           | PostgreSQL driver         |
| bcryptjs     | Password hashing          |
| jsonwebtoken | JWT authentication        |
| dotenv       | Environment configuration |

---

# 📂 Project Structure

```bash
src/
│
├── app.ts
├── server.ts
│
├── config/
│   └── index.ts
│
├── db/
│   ├── db.ts
│   └── schema.ts
│
├── middleware/
│   ├── auth.ts
│   └── globalErrorHandler.ts
│   └── index.d.ts
│
├── modules/
│   ├── auth/
│   └── issue/
│
├── utils/
│   ├── AppError.ts
│   └── sendResponse.ts
│
└── types/
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DATABASE_URI=your_postgresql_database_url

JWT_SECRET=your_secret_key
```

---

# 🗄️ Database Schema Summary

## Users Table

| Field      | Type                     |
| ---------- | ------------------------ |
| id         | SERIAL PRIMARY KEY       |
| name       | VARCHAR(100)             |
| email      | VARCHAR(255) UNIQUE      |
| password   | TEXT                     |
| role       | contributor / maintainer |
| created_at | TIMESTAMP                |
| updated_at | TIMESTAMP                |

---

## Issues Table

| Field       | Type                          |
| ----------- | ----------------------------- |
| id          | SERIAL PRIMARY KEY            |
| title       | VARCHAR(150)                  |
| description | TEXT                          |
| type        | bug / feature_request         |
| status      | open / in_progress / resolved |
| reporter_id | INTEGER                       |
| created_at  | TIMESTAMP                     |
| updated_at  | TIMESTAMP                     |

---

# 🔐 Authentication & Authorization

JWT-based authentication system:

1. User logs in with email & password
2. Server verifies credentials
3. JWT token is generated
4. Client sends token in Authorization header
5. Protected routes verify token before access

Example Header:

```http
Authorization: Bearer your_jwt_token
```

---

# 👥 User Roles

| Role        | Permissions                  |
| ----------- | ---------------------------- |
| contributor | Create & view issues         |
| maintainer  | Full issue management access |

---

# 📡 API Endpoints

---

# 🔹 Auth Routes

## Register User

### POST `/api/auth/signup`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@devpulse.com",
  "password": "securePassword123",
  "role": "contributor"
}
```

---

## Login User

### POST `/api/auth/login`

### Request Body

```json
{
  "email": "john.doe@devpulse.com",
  "password": "securePassword123"
}
```

---

# 🔹 Issue Routes

## Create Issue

### POST `/api/issues`

### Protected Route

```json
{
  "title": "Database connection timeout under load",
  "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
  "type": "bug"
}
```

---

## Get All Issues

### GET `/api/issues`

### Query Parameters

| Parameter | Values                        |
| --------- | ----------------------------- |
| sort      | newest / oldest               |
| type      | bug / feature_request         |
| status    | open / in_progress / resolved |

Example:

```bash
/api/issues?sort=newest&type=bug
```

---

## Get Single Issue

### GET `/api/issues/:id`

---

## Update Issue

### PATCH `/api/issues/:id`

### Protected Route

```json
{
  "title": "Updated issue title",
  "description": "Updated description",
  "type": "bug"
}
```

---

## Delete Issue

### DELETE `/api/issues/:id`

### Maintainer Only

---

# 🚨 Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

---

# ✅ Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

# 🔒 Security Features

* Passwords hashed using bcrypt
* JWT authentication
* Role-based route protection
* Protected API endpoints
* Input validation
* Centralized error handling

---

# 🧠 Important Implementation Notes

* No ORM used
* No SQL JOIN used
* Only raw SQL queries with `pool.query()`
* Reporter details fetched separately without JOIN
* Modular scalable architecture followed

---

# 🧪 Run Project Locally

## 1️⃣ Clone Repository

```bash
git clone https://github.com/niloyahmadramjan/DevPulse-B7A2.git
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create `.env` file.

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

---

# 🌍 Deployment

Backend can be deployed on:

* Render
* Railway
* Vercel

Database Providers:

* NeonDB
* Supabase
* ElephantSQL

---

# 👨‍💻 Author

### MD RAMJAN ALI

Backend Developer | Node.js | TypeScript | PostgreSQL

---

# 📜 License

This project is created for academic assignment purposes.
