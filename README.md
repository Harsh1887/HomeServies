# 🛠 HomeServices – Service Booking Platform

This is a service booking web application built using **Angular** for the frontend and **PHP** (via Express-style API) for the backend. The application allows users to browse and book various home services while the admin manages service listings through the backend.

---

## 📦 Project Structure

- `homeservices/` – Angular frontend project  
- `api_homeservices/` – PHP backend APIs (placed in XAMPP's `htdocs`)  
- `homeservices.sql` – MySQL database file

---

## ✅ Prerequisites

Ensure the following tools are installed on your system:

- **Angular CLI**
- **Node.js & npm**
- **Express (via npm)**
- **XAMPP (Apache + MySQL)**
- **VS Code** (or any modern code editor)

---

## 🚀 Setup Instructions

### 1. Place Project Files

- Put the `homeservices/` folder anywhere on your system (e.g., `Documents/Projects/`).
- Copy the `api_homeservices/` folder into the `htdocs` directory of your **XAMPP** installation.

### 2. Import Database

- Start **XAMPP** and launch **phpMyAdmin**.
- Create a new database (e.g., `homeservices_db`).
- Import the `homeservices.sql` file into the newly created database.

### 3. Running the Project

- Open both folders (`homeservices/` and `api_homeservices/`) in **VS Code**.
- Make sure **Apache** and **MySQL** are running in XAMPP.

#### Frontend (Angular)

1. Navigate to the `homeservices/` directory in terminal:
   ```bash
   cd homeservices

2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the project:

   ```bash
   ng serve
   ```
4. Open your browser and visit:
   `http://localhost:4200`

#### Backend (PHP via htdocs)

* Ensure your PHP APIs are accessible via:
  `http://localhost/api_homeservices/`

---

## 🗂 How to Run Inside VS Code

* Open **any file inside the `src/` folder** of the Angular project (e.g., `app.component.ts`).
* Make sure the frontend is running with `ng serve`.
* Keep your **XAMPP server active** while testing the API connection.

---

## 📝 Notes

* Update API endpoint URLs in Angular files if needed (`localhost` or `127.0.0.1`).
* Ensure CORS is handled correctly between frontend and backend (if needed).
* Default port for Angular is `4200`; change if it conflicts.

---

### Happy building!
