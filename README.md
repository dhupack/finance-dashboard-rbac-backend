# Finance Dashboard RBAC Backend

## Overview
This project is a backend API for a finance dashboard with role-based access control (RBAC), built using Node.js, Express (ES6 modules), and MongoDB (Mongoose). It supports user authentication (JWT), CRUD operations for financial records, analytics, and is fully documented with Swagger.

## Features
- User registration and login with JWT authentication
- Role-based access control (admin, user, etc.)
- CRUD APIs for financial records (income/expense)
- Dashboard analytics (totals, breakdowns)
- Pagination and filtering for records
- Rate limiting to prevent abuse
- Centralized error handling
- API documentation with Swagger (OpenAPI)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Zorvyn_Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` and set your MongoDB URI, JWT secret, and port.

4. **Start the server**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

5. **Access API docs**
   - Swagger UI: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

## API Endpoints

- **/api/users/register** – Register a new user
- **/api/users/login** – Login and receive JWT
- **/api/records** – CRUD for financial records (protected)
- **/api/dashboard/summary** – Dashboard analytics (protected)
- **/api/health** – Health check

See Swagger UI for full details and request/response schemas.

## Assumptions & Tradeoffs
- Passwords are hashed with bcryptjs before storage.
- JWT is used for stateless authentication; tokens expire after a set time.
- Role-based middleware restricts access to sensitive endpoints.
- Rate limiting is applied globally (100 requests/15min/IP) for abuse prevention.
- No email verification or password reset implemented (can be added).
- Minimal frontend validation; backend validates required fields and types.
- MongoDB is assumed to be available and running.

## Project Structure

- `src/models/` – Mongoose schemas (User, Record)
- `src/controllers/` – Route logic and business rules
- `src/routes/` – Express route definitions
- `src/middlewares/` – Auth, RBAC, error handling, rate limiting
- `src/config/` – DB and Swagger config
- `src/app.js` – Express app setup
- `server.js` – Entry point

## How to Test

1. Register a user via `/api/users/register`
2. Login via `/api/users/login` to get a JWT
3. Authorize in Swagger UI using the JWT ("Authorize" button)
4. Use protected endpoints (records, dashboard)

## Error Handling & Validation
- All endpoints return consistent error responses (status, message)
- Input validation is performed for required fields and types
- Invalid JWT or insufficient role returns 401/403

## Additional Notes
- The codebase is modular and follows separation of concerns
- All business logic is in controllers/services, not routes
- Swagger docs are kept up-to-date with JSDoc comments
- Rate limiting and RBAC can be customized as needed

---

**Contact:** For questions or suggestions, please open an issue or contact the maintainer.
