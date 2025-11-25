# InventoryPro

A robust, full-stack Inventory Management System built with the PERN/MERN stack philosophy (using MySQL).

![Tech Stack](https://skillicons.dev/icons?i=react,nodejs,express,mysql,vite,tailwind)

## 🚀 Features

*   **User Authentication**: Secure JWT-based registration and login.
*   **Real-time Dashboard**: View total inventory value, item counts, and low-stock alerts.
*   **Inventory Management**: Create, Read, Update, and Delete (CRUD) items.
*   **Responsive Design**: Modern UI built with Tailwind CSS and React.
*   **Monorepo Structure**: Managed with `concurrently` for easy development.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Axios, React Router.
*   **Backend**: Node.js, Express.js.
*   **Database**: MySQL (with Sequelize ORM).
*   **Tools**: Concurrently, Dotenv, Bcrypt.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## ⚙️ Configuration

1.  **Database Setup**
    Open your MySQL client (Workbench, CLI, etc.) and create the database:
    ```sql
    CREATE DATABASE inventory_db;
    ```

2.  **Environment Variables**
    The server requires a `.env` file. A sample is provided in `server/.env.example`.
    
    Create `server/.env` with your specific credentials:
    ```env
    PORT=5000                 # Node.js Server Port
    DB_HOST=127.0.0.1         # Database Host (Use 127.0.0.1 for Windows)
    DB_USER=root              # Your MySQL Username
    DB_PASS=your_password     # Your MySQL Password
    DB_NAME=inventory_db      # Database Name
    DB_PORT=3306              # MySQL Port (Default 3306)
    JWT_SECRET=your_secret    # Secret key for JWT
    ```

## 📦 Installation

1.  **Install All Dependencies**
    Run this command from the **root** directory to install dependencies for the root, server, and client:
    ```bash
    npm install
    cd server && npm install
    cd ../client && npm install
    cd ..
    ```

## 🚀 Running the Application

Start both the backend and frontend with a single command from the **root** directory:

```bash
npm run dev
```

*   **Frontend**: [http://localhost:5173](http://localhost:5173)
*   **Backend**: [http://localhost:5000](http://localhost:5000)

## 🔧 Troubleshooting

### Database Connection Refused (`ECONNREFUSED`)
*   Ensure MySQL service is running.
*   Check if `DB_HOST` is set to `127.0.0.1` instead of `localhost`.
*   Verify your MySQL port. If it's running on `3307`, update `DB_PORT` in `.env`.
*   Run the diagnostic script: `cd server && node test-db.js`.

### Port Conflicts (`EADDRINUSE`)
*   Ensure `PORT` in `.env` (Node server) is different from `DB_PORT` (MySQL).
*   Recommended: `PORT=5000`, `DB_PORT=3306` (or 3307).

## 📂 Project Structure

```
InventoryPro/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── context/        # Auth Context
│   │   └── ...
├── server/                 # Express Backend
│   ├── config/             # DB Configuration
│   ├── models/             # Sequelize Models
│   ├── routes/             # API Routes
│   └── ...
├── package.json            # Root configuration
└── README.md               # Documentation
```
