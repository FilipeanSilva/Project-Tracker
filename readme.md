# 🚀 Project Tracker

**Project Tracker** is a full-stack application for managing projects and tasks. It features a clean React-based user interface and an ASP.NET Core REST API on the backend.

---

## 🧱 Project Structure

The application is divided into two main parts:

- **`/back-end`** – ASP.NET Core Web API for data access and business logic  
- **`/front-end`** – React application for the user interface

---

## 🔧 Backend – ASP.NET Core

The backend is built with **.NET 6** and provides a RESTful API for managing projects and their tasks.

### 📂 Key Folders

- `Models/` – Entity definitions (e.g., Project, Task)
- `Data/` – Database context and configuration
- `Controllers/` – API endpoints for CRUD operations
- `Migrations/` – EF Core database migrations

---

## 🌐 Frontend – React

The frontend is a modern React SPA that communicates with the backend API to perform operations and display project/task data.

### 📂 Key Folders

- `components/` – Reusable UI components:
  - `Header` – Navigation bar
  - `ProjectList` – Overview of all projects
  - `ProjectDetails` – Detailed view of a selected project
  - `ProjectForm` – Form to create/edit a project
  - `TaskList` – List of tasks within a project
  - `TaskForm` – Form to create/edit tasks
- `styles/` – CSS files scoped by component
- `utils/` *(optional)* – Shared utility functions (e.g., formatting, validation)

---

## ▶️ Getting Started

### ✅ Prerequisites

- [.NET SDK 6.0+](https://dotnet.microsoft.com/download)
- [Node.js 14+](https://nodejs.org/)
- SQL Server or SQLite (depending on configuration)

---

### 🛠 Installation & Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/FilipeanSilva/project-tracker.git
   cd project-tracker
   ```

2. **Install dependencies & build**

   ```bash
   npm run setup
   ```

   This will:
   - Install root dependencies (including `concurrently`)
   - Restore .NET backend dependencies and build the project
   - Install frontend (React) dependencies

3. **Start the development servers**

   ```bash
   npm start
   ```

   This will run:
   - Backend API on `http://localhost:5070` (or the configured port)
   - Frontend on `http://localhost:5072` (or the configured port)

---

### 📦 Available Scripts

| Command                | Description                              |
|------------------------|------------------------------------------|
| `npm run setup`        | Installs dependencies for both layers    |
| `npm start`            | Runs backend and frontend concurrently   |
| `npm run start:backend`| Starts only the backend                  |
| `npm run start:frontend`| Starts only the frontend                 |
| `npm run clean`        | Removes all build artifacts & deps       |

---

## ✅ Features

- 📁 Manage Projects: Create, edit, delete
- ✅ Task Tracking: Add tasks per project with status control
- 📅 Project duration & progress indicators
- 💻 Clean and responsive user interface

---

## 🛠 Technologies

### Backend
- **ASP.NET Core**
- **Entity Framework Core**
- RESTful API design
- SQLite/SQL Server (via EF Core)

### Frontend
- **React**
- **React Router v6**
- CSS Modules / Scoped styling

---