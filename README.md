📒 Note Book App
Live Portfolio Link

🛠 Overview
The Note Book App is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application built using modern technologies. It enables users to register and manage personal notes securely with JWT-based authentication.

Each user has their own login and sign-up credentials. Notes are securely stored and associated with the user in a MongoDB database, ensuring privacy and separation of data.

✨ Features
🔐 User Authentication (JWT-based)

📝 Create, Read, Update, and Delete Notes

💾 Notes stored in MongoDB with user-specific access

🚀 Modern stack: React.js (with Vite) for frontend, Express.js and Node.js for backend

⚡ Fast performance and responsive design

📦 Tech Stack
Frontend: React.js + Vite

Backend: Node.js + Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

🔧 Installation Guide
⚙️ Backend Setup
Ensure you have Node.js installed

Clone the repository and navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:

bash
Copy
Edit
npm install
Add your configuration:

Create a .env file

Add your MongoDB URI, JWT secret, and any other necessary environment variables

Start the server:

bash
Copy
Edit
npm start
🌐 Frontend Setup
Uses Vite for a fast and modern React development experience

Navigate to the frontend folder:

bash
Copy
Edit
cd frontend
Initialize the project (if not already created):

bash
Copy
Edit
npm create vite@latest
Move into your project directory:

bash
Copy
Edit
cd my-project
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
🔑 Environment Variables
Make sure to configure the following environment variables in the backend .env file:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
📝 Notes
Replace placeholder values (MONGO_URI, JWT_SECRET) with your actual credentials.

Ensure both frontend and backend are correctly pointing to each other’s endpoints (e.g., CORS, API URLs).

📸 Screenshots
Add screenshots of your app here to showcase its functionality.

🌍 Live Demo
Coming soon or [host it using platforms like Vercel, Netlify (Frontend) and Render, Cyclic (Backend)].

📩 Contact
Have feedback or suggestions? Reach out via the portfolio or open an issue on GitHub.
