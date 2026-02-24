

# **📘 Googlopedia – Online Book & Article Store**

Googlopedia is a full-stack web application that provides a digital platform for browsing and purchasing books and reading free knowledge-based articles with secure authentication and role-based access.

This project demonstrates real-world implementation of a scalable client–server architecture using modern backend and frontend technologies.

---

# **❓ Why This Project?**

This project was built to understand how real-world applications are designed and developed using industry-standard tools and practices.

It focuses on:

* Secure user authentication and authorization
* Scalable backend development
* RESTful API design
* Database management using ORM
* Full frontend ↔ backend integration

It bridges the gap between academic learning and real-world software development.

---

# **🌍 Real-Life Impact & Practical Use**

Googlopedia simulates real-world platforms like Amazon (product flow), Medium (article system), and Flipkart (cart & order management).

### **👤 For Users**

* Explore and purchase books online from anywhere
* Read free articles for continuous learning
* Maintain personal profile and order history
* Experience a real e-commerce workflow

### **👑 For Admin**

* Manage books and articles through a secure dashboard
* Perform add, update, and delete operations
* Control system access using role-based authorization

This project shows how digital systems:

* Replace manual record management
* Provide secure user-specific experiences
* Handle structured relational data efficiently

---

# **🎯 How This Project Helps in Real Life (Developer Perspective)**

Through this project I learned:

* Building production-ready REST APIs using Spring Boot
* Implementing JWT-based authentication used in modern applications
* Designing relational databases with proper entity relationships
* Creating a Single Page Application using React
* Connecting frontend and backend using Axios
* Managing global authentication state
* Writing clean, modular, and maintainable code
* Implementing role-based access control

These are the exact skills required for a **Java Full Stack Developer role**.

---

# **🏗️ Tech Stack & Responsibilities**

## **🔹 Backend – Spring Boot**

Used for:

* Creating REST APIs
* Implementing business logic
* Securing APIs
* Communicating with database

### **Technologies**

**Java 17**
Core programming language used for backend development. Provides OOP concepts, platform independence, and compatibility with Spring Boot 3.

**Spring Boot 3.2.x**
Main backend framework that provides auto-configuration, embedded Tomcat server, and production-ready setup.

**Spring Security 6**
Used to secure REST APIs and implement authentication and role-based authorization.

**JWT (JSON Web Token)**
Used for stateless authentication. Stores user identity and role and is sent with every protected request.

**Spring Data JPA**
Provides built-in CRUD operations and simplifies database access.

**Hibernate 6**
ORM tool that converts Java objects into SQL queries and maps entities to database tables.

**MySQL 8**
Relational database used to store users, books, articles, cart items, and orders.

**Maven**
Dependency management and build automation tool used to run the Spring Boot application.


---

## **🔹 Frontend – React**

Used for:

* Building responsive UI
* Client-side routing (SPA)
* Calling backend APIs
* Managing authentication state

### **Technologies**

**React 18**
Used to build a component-based dynamic user interface and enable fast rendering using the Virtual DOM.

**Vite**
Fast frontend build tool that provides instant server start and hot module replacement.

**React Router DOM 6**
Used for navigation without page reload and implementing protected routes.

**Axios**
Handles HTTP communication between React and Spring Boot and attaches JWT token to requests.

**Context API**
Used for global authentication state management across the application.

**Tailwind CSS 3**
Utility-first CSS framework used to create modern and responsive UI.

---

## **🔹 Development & Tools**

**VS Code**
Used for backend and frontend development.

**MySQL Workbench**
Used for database design and management.

**Git & GitHub**
Used for version control and project hosting.

---

# **⚙️ Version Compatibility**

* Java 17 ↔ Spring Boot 3 ↔ Spring Security 6 ↔ Hibernate 6
* React 18 ↔ Vite ↔ Tailwind CSS 3
* MySQL 8

This modern stack ensures high performance, long-term support, and industry-standard development.

---

# **✨ Core Features**

## **🔐 Authentication System**

* User registration & login
* JWT-based authentication
* Persistent login
* Secure API access

**Tech Flow:**
React Form → Axios → Spring Security → JWT → MySQL

**Why used:**
To provide secure and stateless authentication used in real-world applications.

---

## **👤 Role-Based Authorization**

* Two roles: USER and ADMIN
* Protected frontend routes
* Secured backend APIs

**Why used:**
To ensure only authorized users access sensitive operations.

---

## **📚 Book Module**

* View all books
* Search books
* View book details

**Tech Flow:**
React → Axios → REST Controller → Service → JPA → MySQL

**Why used:**
To demonstrate dynamic data rendering and API-driven UI.

---

## **📰 Article Module**

* View and read free articles

**Why used:**
To implement a content management system similar to blogging platforms.

---

## **🛒 Cart System**

* Add to cart
* Remove from cart
* View cart

**Why used:**
To simulate real e-commerce functionality and relational database mapping.

---

## **📦 Order Management**

* Place order
* Store order details

**Why used:**
To demonstrate transaction flow and real-world data persistence.

---

## **👑 Admin Dashboard**

* Add / update / delete books
* Add / update / delete articles

**Why used:**
To implement secure content management with role-based access.

---

# **🔄 Complete Request Flow**

**Example: Fetch Books**

1. React component loads
2. Axios calls backend API
3. Controller receives request
4. Service processes logic
5. Repository interacts with JPA
6. Hibernate generates SQL
7. MySQL returns data
8. JSON response sent to React
9. UI updates dynamically

---

# **🗄️ Database Design**

Main tables:

* users
* books
* articles
* cart_items
* orders

JPA automatically maps Java entities to MySQL tables.

---

# **⚙️ How to Run Locally**

## **🔹 Clone Repository**

```bash
git clone https://github.com/your-username/googlopedia.git
cd googlopedia
```

---

## **🔹 Backend Setup**

Configure:

```
spring.datasource.url=jdbc:mysql://localhost:3306/googlopedia_db
spring.datasource.username=root
spring.datasource.password=your_password
```

Run:

```bash
mvn spring-boot:run
```

---

## **🔹 Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

---

# **🌐 Application URLs**

**Frontend:**
[http://localhost:5173](http://localhost:5173)

**Backend:**
[http://localhost:8080](http://localhost:8080)

---

# **🧠 Key Concepts Implemented**

* RESTful API development
* Layered architecture
* JWT authentication
* Role-based authorization
* ORM using JPA & Hibernate
* Single Page Application (SPA)
* Global state management
* Full-stack integration

---

# **👨‍💻 Author**

**Nabeel Haleem**
Final Year CSE Student
Aspiring Java Full Stack Developer

