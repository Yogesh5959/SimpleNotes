# 📝 SimpleNotes – Full Stack Note Management Application

SimpleNotes is a full-stack web application that allows users to create, view, update, and delete their personal notes through a clean and user-friendly interface.

The application is developed using **Java Spring Boot** for the backend, **React.js** for the frontend, and **MySQL** for database management.

It also includes user authentication, session management, and activity tracking to provide a more organized and personalized note-taking experience.

The main objective of this project is to understand how frontend and backend applications communicate, how REST APIs work, and how data is stored and managed in a relational database.

---

## 🚀 Technologies Used

### 1. Frontend Technologies

| Technology | Purpose |
|---|---|
| React.js | Building the user interface |
| JavaScript | Handling application logic and interactions |
| HTML5 | Structuring web pages |
| Tailwind CSS | Styling and responsive UI design |
| Vite | Frontend development server and build tool |
| Fetch API | Communicating with backend REST APIs |

### 2. Backend Technologies

| Technology | Purpose |
|---|---|
| Java | Core programming language |
| Spring Boot | Developing the backend application |
| Spring Web | Creating REST APIs |
| JdbcTemplate | Executing SQL queries and database operations |
| REST API | Communication between frontend and backend |
| Maven | Dependency management and project building |
| Jakarta Servlet / HttpSession | Managing user sessions |

### 3. Database

| Technology | Purpose |
|---|---|
| MySQL | Relational database |
| SQL | Creating, retrieving, updating and deleting records |

---

## ✨ Features Implemented

### 1. User Authentication

- User login functionality.
- Session-based user authentication.
- Maintaining user login sessions using HttpSession.
- Login and logout functionality.

**Where implemented:** Backend authentication Controller and Service packages.

### 2. Create Notes

- Users can create new notes.
- Each note contains a title and content.
- Note information is stored in the MySQL database.
- Automatically generated note ID.

**Where implemented:** Note Controller, Service and database table.

### 3. View Notes

- Retrieve all available notes.
- Display notes through the React frontend.
- Fetch note information from the backend using REST APIs.

**Where implemented:** Note Controller and React frontend components.

### 4. Update Notes

- Modify existing note information.
- Update the title and content of a note.
- Save updated information in the database.

**Where implemented:** Note Controller and Service packages.

### 5. Delete Notes

- Delete unwanted notes.
- Remove the corresponding records from the MySQL database.

**Where implemented:** Note Controller and database operations.

### 6. User Activity Tracking

- Track user-related activities.
- Store activity information in the database.
- Retrieve activity records through backend APIs.

**Where implemented:** UserActivity Entity, UserActivityService and UserActivity Controller.

### 7. Responsive User Interface

- Clean and modern user interface.
- Organized note management pages.
- Gradient-based visual design.
- Interactive forms and buttons.
- Responsive frontend styling using Tailwind CSS.

**Where implemented:** React frontend and Tailwind CSS components.

### 8. Frontend and Backend Integration

- React communicates with Spring Boot through REST APIs.
- Uses HTTP requests to perform CRUD operations.
- Backend processes requests and communicates with MySQL.
- JSON is used for exchanging application data.

---

## 🏗️ Project Architecture

SimpleNotes follows a client-server architecture.

```text
              USER
                |
                v
       REACT FRONTEND
       (Vite + Tailwind CSS)
                |
                |
           HTTP Requests
             (JSON)
                |
                v
       SPRING BOOT BACKEND
                |
                v
          CONTROLLER
                |
                v
            SERVICE
                |
                v
          JDBC TEMPLATE
                |
                v
            MYSQL DB
```

### How the application works

1. The user interacts with the React frontend.
2. React sends an HTTP request to the Spring Boot backend.
3. The Controller receives the request.
4. The Service layer handles the application logic.
5. JdbcTemplate executes the required SQL query.
6. MySQL stores or retrieves the requested information.
7. Spring Boot sends a response to React.
8. React displays the result to the user.

---

## 📂 Project Structure

The project contains two main parts: Frontend and Backend.

### Backend Structure

```text
SimpleNotes/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/demo/SimpleNotes/
│       │       │
│       │       ├── Controllers/
│       │       │   ├── NoteController.java
│       │       │   ├── LoginController.java
│       │       │   └── UserActivityController.java
│       │       │
│       │       ├── Entity/
│       │       │   ├── Note.java
│       │       │   ├── Login.java
│       │       │   └── UserActivity.java
│       │       │
│       │       ├── Service/
│       │       │   ├── NoteService.java
│       │       │   ├── LoginService.java
│       │       │   └── UserActivityService.java
│       │       │
│       │       └── SimpleNotesApplication.java
│       │
│       └── resources/
│           └── application.properties
│
├── pom.xml
└── README.md
```

### Frontend Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

*Note: The structure above illustrates the main application organization. Adjust individual filenames and folders to match your final repository.*

---

## ⚙️ How to Run the Project Locally

Follow these steps to run SimpleNotes on your computer.

### Prerequisites

Install the following software before running the application:

- Java JDK 24 (or the JDK version configured in the project).
- Apache Maven.
- Node.js and npm.
- MySQL Server.
- Eclipse / IntelliJ IDEA / VS Code.

### Step 1: Clone the Repository

Open your terminal and execute:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd SimpleNotes
```

### Step 2: Configure MySQL Database

Open MySQL Workbench or your MySQL command line.

Create a database:

```sql
CREATE DATABASE simpleNotes_db;
```

The application uses the following notes table:

```sql
USE simpleNotes_db;

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) UNIQUE NOT NULL,
    content VARCHAR(500) NOT NULL
);
```

Make sure your database username and password are configured correctly.

### Step 3: Configure Backend

Open the backend project in Eclipse or IntelliJ IDEA.

Navigate to:

`src/main/resources/application.properties`

Configure your MySQL connection:

```properties
spring.application.name=SimpleNotes

spring.datasource.url=jdbc:mysql://localhost:3306/simpleNotes_db

spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.

Make sure the MySQL server is running.

### Step 4: Run the Spring Boot Backend

Open the terminal inside the backend project directory.

Execute:

```bash
mvn spring-boot:run
```

Alternatively, open `SimpleNotesApplication.java` and run it as a Spring Boot application from your IDE.

The backend will start at:

```text
http://localhost:8080
```

### Step 5: Run the React Frontend

Open another terminal.

Navigate to your frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The terminal will display a local URL, usually:

```text
http://localhost:5173
```

Open this URL in your browser.

### Step 6: Start Using SimpleNotes

Once both applications are running:

1. Open the frontend in your browser.
2. Register or log in if your authentication flow requires it.
3. Navigate to the note management section.
4. Create a new note.
5. View, update or delete your notes.
6. Explore the available user activity functionality.

**Important:** Keep both the Spring Boot backend and React frontend running while using the locally hosted application.

---

## 🔗 Main Backend API Endpoints

The following are the main note-management endpoints.

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/api/note` | Create a new note |
| GET | `/api/note/getNotes` | Retrieve notes |
| PUT | `/api/note/{id}` | Update a note |
| DELETE | `/api/note/{id}` | Delete a note |

*The update and delete endpoint paths above are illustrative. Verify the exact mappings in your NoteController before publishing.*

---

## 🧠 Concepts Learned Through This Project

This project helped me understand and implement several important full-stack development concepts:

- Building RESTful APIs using Spring Boot.
- Understanding the Controller-Service architecture.
- Connecting Java applications with MySQL.
- Performing CRUD operations using JdbcTemplate.
- Writing SQL queries.
- Integrating React with a Spring Boot backend.
- Handling HTTP requests and JSON responses.
- Implementing session-based authentication.
- Managing user activity.
- Handling frontend and backend integration.
- Configuring CORS.
- Managing dependencies using Maven and npm.
- Deploying frontend and backend applications.

---

## 🎯 Future Improvements

Some improvements that can be considered for future versions:

- Implement Spring Security.
- Add role-based authorization.
- Introduce stronger user data isolation.
- Add note searching and filtering.
- Add categories and tags for notes.
- Implement pagination for large note collections.
- Add automated unit and integration tests.
- Improve input validation and error handling.

---

## 👨‍💻 Developer

**Yogesh R**

Java Full Stack Developer | Spring Boot | React | MySQL

---

## ⭐ Support

If you find this project useful or interesting, consider giving this repository a star on GitHub!

Thank you for checking out SimpleNotes.
