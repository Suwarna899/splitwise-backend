# ⚙️ Splitwise Clone - Backend (API)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

The server-side logic for the Splitwise Clone. This API handles user authentication, group creation, and complex expense data persistence using MongoDB Atlas.

## 🚀 API Endpoint
**Production URL:** [https://splitwise-backend-ten.vercel.app](https://splitwise-backend-ten.vercel.app)

---

## 🛠️ Core Features
- **JWT Authentication:** Secure user sessions and protected API routes.
- **RESTful API Design:** Clean endpoints for `CRUD` operations on Groups and Expenses.
- **Middleware Integration:** Custom error handling and authentication verification.
- **Serverless Optimized:** Specifically configured for Vercel with optimized Mongoose connection pooling.

---

## 📡 API Endpoints

### Auth
- `POST /auth/register` - Create a new user.
- `POST /auth/login` - Authenticate user and receive token.

### Groups
- `GET /groups/list` - Fetch all groups for the logged-in user.
- `POST /groups/create` - Create a new group with members.

### Expenses
- `POST /expenses/add` - Add an expense to a specific group.
- `GET /expenses/:groupId` - Retrieve all expenses for a group.

---

## 📁 Project Structure
```text
├── src/
│   ├── routes/        # Auth, Group, and Expense route definitions
│   ├── models/        # Mongoose schemas (User, Group, Expense)
│   └── app.js         # Express configuration and middleware
├── server.js          # Entry point for Vercel/Local environment
└── vercel.json        # Serverless function routing & builds

🧠 Database Schema
The database uses MongoDB Atlas with three primary collections:

Users: Stores credentials and basic profile info.

Groups: Contains group metadata and a list of member IDs.

Expenses: Stores amount, description, payer, and group references.
👤 Author
S SUWARNA - https://github.com/Suwarna899
