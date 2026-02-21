# How to Run Googlopedia

Follow these steps to set up and run the project on your local machine.

## Prerequisites
- **Java 17+**
- **Maven**
- **Node.js & npm**
- **MySQL Server**

## 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench or Command Line).
2. Execute the commands found in `database_schema.sql` to create the database and tables.
   ```sql
   CREATE DATABASE googlopedia_db;
   ```
3. Update `googlopedia-backend/src/main/resources/application.properties` with your MySQL username and password if they are different from `root`/`root`.

## 2. Run Backend (Spring Boot)
1. Open a terminal in the `googlopedia-backend` folder.
2. Run the command:
   ```bash
   mvn spring-boot:run
   ```
3. The server should start on `http://localhost:8080`.

## 3. Run Frontend (React + Vite)
1. Open another terminal in the `googlopedia-frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## 4. Testing the Application
- **User Role**: Register a new account. You can browse books, add them to your cart, read articles, and "place an order".
- **Admin Role**: Register an account and select the **Admin** role (provided for testing ease). Navigate to the **Admin Dashboard** via the navbar to manage (Add/Update/Delete) books and articles.

## Note
- If you face any CORS issues, ensure the `ALLOWED_ORIGINS` in `SecurityConfig.java` matches your frontend URL.
- Use a tool like **Unsplash** for book image URLs to make the UI look premium.
