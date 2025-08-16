Database setup (MySQL)
======================

1) Create database and tables

Run the following SQL (use MySQL shell or a GUI like MySQL Workbench):

```sql
CREATE DATABASE IF NOT EXISTS smart_student_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_student_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('student','teacher','admin') NOT NULL DEFAULT 'student',
  phone VARCHAR(20) NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verification_token VARCHAR(255) NULL,
  reset_token VARCHAR(255) NULL,
  reset_token_expiry DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(50) NOT NULL UNIQUE,
  class VARCHAR(50) NOT NULL,
  section VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('present','absent','late') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

2) Configure environment variables

Create a `.env` file in `backend/` with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=smart_student_db
PORT=5000
JWT_SECRET=change_me
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your_smtp_password
BASE_URL=http://localhost:5000
```

3) Start MySQL

- Windows (Services): Ensure the `MySQL` service is running (Services app → MySQL → Start)
- Or using command line if installed with a service name like `MySQL80`:
  `net start MySQL80`

4) Verify connection

Start the server and open `http://localhost:5000/health`. Expected response:

```json
{ "status": "ok", "db": "up" }
```


