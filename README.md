Video link 01 
https://www.loom.com/share/6b6f60050d75434bb43643c6584f960e?sid=f1756622-8a1a-46d3-a35f-7e5f492a7a8c
Video link 02
https://www.loom.com/share/9a973b1ec5434193b62d63868532c88b?sid=7d807a7a-7b3d-4c0e-96f4-f7fe7496515e
Task Management App



🔄 Tech Stack

Frontend:

React.js

Redux Toolkit

Bootstrap

Backend:

Express.js

MongoDB (Mongoose ODM)

💡 Features Overview

📆 Task Management

Create Tasks with:

Title (max 100 chars)

Description (max 500 chars)

Optional Deadline

Status: To Do, In Progress, Done

Edit Tasks

Modify all task fields

Delete Tasks

Confirmation modal before deletion

Update Status

Status can be updated using dropdown

📂 Filtering & Search

Filter by status: All, To Do, In Progress, Done

Keyword search in title and description

🪀 Logic-Based Functionality

Auto Grouping:

Tasks are displayed in three columns by status

Each column is sorted by most recently updated

Validation:

Empty or too-long title/description not allowed

Duplicate titles under the same status are blocked

Overdue Detection:

Tasks past their deadline show a red warning badge

✨ Bonus Features

Light/Dark mode toggle

Important Tasks are managed in seperate tab

🪤 Setup Instructions

✨ Frontend (React)

cd frontend
npm install
npm start

🚀 Backend (Express)

cd backend
npm install
npm run dev

Ensure MongoDB is running locally or replace with your Atlas URI in .env:

MONGO_URI=mongodb://localhost:27017/tasks

🧰 Folder Structure

root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env 
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js

🛎⃣ API Routes (Backend)

GET /tasks - Fetch all tasks

POST /tasks - Create a new task

PATCH /tasks/:id - Edit task or update status

DELETE /tasks/:id - Delete task

⏳ Deadline

Submission Date: 23rd May, 2025 - 12:00 PM

📄 Notes


Every feature listed in the evaluation was implemented.

Bonus features like dark mode is included

Tasks are grouped and sorted as per requirements.



