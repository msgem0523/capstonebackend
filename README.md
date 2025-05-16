# GrowthGuard App Backend  
[Backend Repo](https://github.com/msgem0523/capstonebackend) | [Frontend Repo](https://github.com/msgem0523/capstonefrontend)

## Overview  
The **GrowthGuard App** backend powers a full-stack web application that helps parents track their child's medical history and developmental milestones. Built using **Node.js**, **Express.js**, and **MongoDB**, this RESTful API serves secure endpoints for managing users, children’s profiles, and health records.

---

## Features  
✅ **User Authentication** – (Planned) Secure login with JWT or Firebase Auth  
✅ **Medical Logging** – Store vaccination history, allergy info, prescriptions, and doctor visits  
✅ **Milestone Tracking** – Log developmental milestones based on age groups  
✅ **RESTful API** – Designed for clean integration with the frontend  
✅ **MongoDB Integration** – Mongoose schemas with validation and security in mind  

---

## Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JSON Web Token (JWT) *(Coming Soon)*  
- **Environment Variables:** dotenv  
- **Security:** bcrypt, CORS  
- **Testing:** Postman for route testing

---

## How It Works  
1. Backend serves as the API layer for the React frontend.  
2. It exposes endpoints to create and manage user accounts, children’s profiles, and health records.  
3. Includes secure authentication setup (in progress) and robust data validation with Mongoose.

---

## API Endpoints (Sample)

| Method | Route               | Description                      |
|--------|---------------------|----------------------------------|
| POST   | `/api/register`     | Register new user                |
| POST   | `/api/login`        | Login and receive JWT token      |
| GET    | `/api/children`     | Get all children for a user      |
| POST   | `/api/children`     | Add a new child                  |
| PUT    | `/api/children/:id` | Update a child’s profile         |
| DELETE | `/api/children/:id` | Delete a child                   |

*(These may vary depending on implementation; update as needed.)*

---

## Installation

```bash
git clone https://github.com/msgem0523/capstonebackend.git
cd capstonebackend
npm install
