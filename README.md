# Student Management System

A full-stack Student Management application built with **Spring Boot**, **Spring Data JPA**, **H2 Database**, and **Angular**. The application lets users manage students and courses, assign multiple courses to students, and perform create, read, update, and delete (CRUD) operations.

## Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Run Locally](#run-locally)
  - [1. Start the Backend](#1-start-the-backend)
  - [2. Start the Frontend](#2-start-the-frontend)
- [Application URLs](#application-urls)
- [REST API Endpoints](#rest-api-endpoints)
- [Example API Requests](#example-api-requests)
- [Database Notes](#database-notes)
- [Build and Test](#build-and-test)
- [Troubleshooting](#troubleshooting)

## Features

- View, create, edit, and delete students.
- Store a student's name and email address.
- Assign multiple courses to a student.
- View, create, edit, and delete courses.
- Validate required student and course fields.
- Display API errors in the frontend and ask for confirmation before deleting records.
- Persist data locally with an H2 file-based database.

## Technology Stack

### Backend
- Java 17
- Spring Boot (version declared in `backend/pom.xml`)
- Spring Web / REST controllers
- Spring Data JPA and Hibernate
- H2 embedded database and H2 Console
- Maven Wrapper

### Frontend
- Angular 18
- TypeScript
- Angular Router
- Angular Forms
- Angular `HttpClient`
- RxJS
- Node.js and npm

## Project Structure

```text
student-management/
├── backend/
│   ├── mvnw                 # Maven Wrapper for macOS/Linux
│   ├── mvnw.cmd             # Maven Wrapper for Windows
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/assessment/studentmanagement/
│       │   │   ├── controller/
│       │   │   ├── dao/
│       │   │   ├── dto/
│       │   │   ├── exception/
│       │   │   ├── repository/
│       │   │   ├── service/
│       │   │   └── StudentmanagementApplication.java
│       │   └── resources/application.properties
│       └── test/
└── frontend/
    ├── package.json
    ├── angular.json
    └── src/
        └── app/
            ├── components/
            ├── models/
            ├── services/
            ├── app.config.ts
            └── app.routes.ts
```

## Prerequisites

Install the following before starting:

1. **JDK 17** (make sure `java -version` reports Java 17).
2. **Node.js** compatible with Angular 18 (use Node.js 20 LTS, preferably a current compatible 20.x release) and npm.
3. A terminal such as PowerShell, Command Prompt, macOS Terminal, or a Linux shell.
4. A modern browser.

You do not need to install a separate database server: the project uses H2. You also do not need to install Maven globally because the backend includes a Maven Wrapper.

Check the installations:

```bash
java -version
node --version
npm --version
```

## Run Locally

Open **two terminals** from the extracted `student-management` project directory: one for the backend and one for the frontend. Start the backend first.

### 1. Start the Backend

Change to the backend directory:

```bash
cd backend
```

Run the application using the Maven Wrapper.

**macOS / Linux**
```bash
chmod +x mvnw
./mvnw spring-boot:run
```

**Windows PowerShell or Command Prompt**
```bat
mvnw.cmd spring-boot:run
```

The first run may take a few minutes while Maven downloads dependencies. Once startup completes, the API should be available at:

```text
http://localhost:8080
```

Keep this terminal open while using the application.

#### Backend configuration

The current `backend/src/main/resources/application.properties` configures an H2 file database:

```properties
spring.datasource.url=jdbc:h2:file:./students-db
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
spring.h2.console.enabled=true
```

The database file is created relative to the backend process's working directory. Run the application from `backend/` as shown above so the database stays in the expected project location.

### 2. Start the Frontend

Open a **second terminal** from the project root and change to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start Angular's development server:

```bash
npm start
```

Open the application in your browser:

```text
http://localhost:4200
```

The frontend's student and course services currently call the backend at `http://localhost:8080/api`. The backend controllers allow cross-origin requests from `http://localhost:4200`, so use those local ports unless you also update the corresponding configuration.

## Application URLs

| Purpose | URL |
|---|---|
| Angular application | `http://localhost:4200` |
| Students API | `http://localhost:8080/api/students` |
| Courses API | `http://localhost:8080/api/courses` |
| H2 Console (if enabled and available) | `http://localhost:8080/h2-console` |

For the H2 Console, use the JDBC URL `jdbc:h2:file:./students-db` and driver `org.h2.Driver`. The username/password may depend on the active configuration; check your application settings if the default connection details do not work. The database path is relative to the backend process's working directory.

## REST API Endpoints

### Students

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students` | List all students |
| `GET` | `/api/students/{id}` | Get a student by ID |
| `POST` | `/api/students` | Create a student |
| `PUT` | `/api/students/{id}` | Update a student |
| `DELETE` | `/api/students/{id}` | Delete a student |

### Courses

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses` | List all courses |
| `GET` | `/api/courses/{id}` | Get a course by ID |
| `POST` | `/api/courses` | Create a course |
| `PUT` | `/api/courses/{id}` | Update a course |
| `DELETE` | `/api/courses/{id}` | Delete a course |

Student creation and updates accept a list of course IDs. Student email addresses and course names are configured as unique in the database.

## Example API Requests

You can run these requests using `curl`, Postman, or another REST client while the backend is running.

### Create a course

```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Mathematics"}'
```

### List courses

```bash
curl http://localhost:8080/api/courses
```

### Create a student and assign courses

Replace `1` in `courseIds` with an existing course ID:

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Jordan Lee","email":"jordan.lee@example.com","courseIds":[1]}'
```

### List students

```bash
curl http://localhost:8080/api/students
```

> If you use Windows PowerShell and `curl` behaves differently, use `curl.exe` or send the requests through Postman.

## Database Notes

- H2 is embedded, so no external database setup is required.
- Data is stored in a local file rather than an in-memory database.
- Hibernate is configured with `ddl-auto=update`, which updates the schema as entities change; it is not a substitute for production database migrations.
- Student emails and course names must be unique.
- Back up the database file before manually changing or deleting it.
- The repository includes a local H2 database file in some distributions. If you want a clean database, stop the backend and back up or remove the generated `students-db` database files before restarting. This will remove locally stored application data.

## Build and Test

### Backend

From `backend/`:

**macOS / Linux**
```bash
./mvnw test
./mvnw clean package
```

**Windows**
```bat
mvnw.cmd test
mvnw.cmd clean package
```

### Frontend

From `frontend/`:

```bash
npm test
npm run build
```

Angular's test command uses Karma and may launch a browser; make sure a supported browser is installed. The production build output is written under `frontend/dist/`.

## Troubleshooting

### Frontend loads but students or courses do not appear
- Confirm the backend is running at `http://localhost:8080`.
- Check the browser developer console and Network tab for failed API requests.
- Confirm the frontend is opened at `http://localhost:4200`; the backend CORS configuration currently allows that origin.

### Port 8080 or 4200 is already in use
Stop the other process using the port, or configure the relevant server to use another port. If you change the backend port or frontend origin, update the frontend service URLs and backend CORS configuration accordingly.

### Maven fails to start
- Verify that Java 17 is installed and selected in `JAVA_HOME` / `PATH`.
- Try the Maven Wrapper commands from the `backend/` directory.
- Check the terminal output for dependency-download or compilation errors.

### `npm install` or `npm start` fails
- Verify Node.js and npm versions.
- Run `npm install` from `frontend/`, where `package.json` is located.
- If dependencies are in a bad state, stop the dev server, remove `node_modules`, and run `npm install` again. Keep `package-lock.json` unless you intentionally want to refresh dependency versions.

### Duplicate email or course name errors
Student email addresses and course names must be unique. Use a different email or course name, or update the existing record.

---

## Quick Start Checklist

- [ ] Install JDK 17 and compatible Node.js/npm.
- [ ] Terminal 1: `cd backend` → `./mvnw spring-boot:run` (Windows: `mvnw.cmd spring-boot:run`).
- [ ] Terminal 2: `cd frontend` → `npm install` → `npm start`.
- [ ] Open `http://localhost:4200`.
- [ ] Confirm the backend responds at `http://localhost:8080/api/students` and `/api/courses`.
