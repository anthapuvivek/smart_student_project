# 🚀 Smart Student API Documentation

## Base URL
```
http://localhost:5000
```

## 📋 API Endpoints Overview

### 🔍 Health & Status
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Welcome message | ❌ |
| GET | `/health` | Health check (server + database) | ❌ |

### 👨‍🎓 Student Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/students` | Get all students | ❌ |
| POST | `/students` | Add new student | ❌ |

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/auth/test` | Test auth routes | ❌ |
| POST | `/auth/register` | User signup | ❌ |
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/request-password-reset` | Request password reset | ❌ |
| GET | `/auth/reset-password` | Validate reset token | ❌ |
| POST | `/auth/reset-password` | Reset password via email | ❌ |
| POST | `/auth/reset-password-phone` | Reset password via phone OTP | ❌ |

### 📊 Attendance Management
| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| POST | `/attendance` | Add attendance | ✅ | Any |
| GET | `/attendance` | Get attendance | ✅ | Any |
| PUT | `/attendance/:id` | Update attendance | ✅ | Teacher |
| DELETE | `/attendance/:id` | Delete attendance | ✅ | Teacher |

---

## 📖 Detailed API Documentation

### 🔍 Health & Status APIs

#### GET `/`
**Description:** Welcome message  
**Response:**
```json
{
  "message": "🚀 Smart Student Backend is running!"
}
```

#### GET `/health`
**Description:** Health check for server and database  
**Response:**
```json
{
  "status": "ok",
  "db": "up"
}
```

### 👨‍🎓 Student Management APIs

#### GET `/students`
**Description:** Get all students  
**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "roll_number": "ST001",
    "class": "10",
    "section": "A",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### POST `/students`
**Description:** Add a new student  
**Request Body:**
```json
{
  "name": "John Doe",
  "roll_number": "ST001",
  "class": "10",
  "section": "A"
}
```
**Response:**
```json
{
  "message": "✅ Student added successfully!",
  "id": 1
}
```

### 🔐 Authentication APIs

#### GET `/auth/test`
**Description:** Test authentication routes  
**Response:**
```json
{
  "message": "Auth routes are working!"
}
```

#### POST `/auth/register`
**Description:** Register a new user  
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```
**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### POST `/auth/login`
**Description:** Login user  
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### POST `/auth/request-password-reset`
**Description:** Request password reset via email or phone  
**Request Body:**
```json
{
  "email": "john@example.com"
}
```
**Response:**
```json
{
  "message": "If an account exists, you will receive reset instructions."
}
```

#### GET `/auth/reset-password?token=abc123`
**Description:** Validate reset token  
**Response:**
```json
{
  "valid": true
}
```

#### POST `/auth/reset-password`
**Description:** Reset password via email token  
**Request Body:**
```json
{
  "token": "abc123",
  "newPassword": "newpassword123"
}
```
**Response:**
```json
{
  "message": "Password reset successful"
}
```

#### POST `/auth/reset-password-phone`
**Description:** Reset password via phone OTP  
**Request Body:**
```json
{
  "phone": "+1234567890",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```
**Response:**
```json
{
  "message": "Password reset successful"
}
```

### 📊 Attendance Management APIs

#### POST `/attendance`
**Description:** Add attendance record  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "student_id": 1,
  "date": "2024-01-15",
  "status": "present"
}
```
**Response:**
```json
{
  "message": "✅ Attendance added successfully!"
}
```

#### GET `/attendance`
**Description:** Get attendance records  
**Headers:** `Authorization: Bearer <token>`  
**Query Parameters:**
- `student_id` (optional): Filter by student ID
- `date` (optional): Filter by date (YYYY-MM-DD)

**Response:**
```json
[
  {
    "id": 1,
    "student_id": 1,
    "student_name": "John Doe",
    "date": "2024-01-15",
    "status": "present",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

#### PUT `/attendance/:id`
**Description:** Update attendance record (Teachers only)  
**Headers:** `Authorization: Bearer <token>`  
**Request Body:**
```json
{
  "status": "absent"
}
```
**Response:**
```json
{
  "message": "✅ Attendance updated successfully!"
}
```

#### DELETE `/attendance/:id`
**Description:** Delete attendance record (Teachers only)  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "message": "🗑️ Attendance deleted successfully!"
}
```

---

## 🧪 Testing Your APIs

### Option 1: Using the Test Script
```bash
cd backend
npm install
npm run test
```

### Option 2: Using Postman
1. Import `postman_collection.json` into Postman
2. Set base URL to `http://localhost:5000`
3. Run the collection

### Option 3: Using curl
```bash
# Health check
curl http://localhost:5000/health

# Get students
curl http://localhost:5000/students

# Register user
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## 🔧 After Adding New Features

When you add new features to your APIs, follow these steps:

### 1. **Update the Test Script**
- Add new test functions in `test_apis.js`
- Include them in the `runAllTests()` function

### 2. **Update Documentation**
- Add new endpoints to this documentation
- Include request/response examples
- Update the endpoints table

### 3. **Test the New Features**
```bash
npm run test
```

### 4. **Update Postman Collection**
- Add new requests to your Postman collection
- Test manually with different scenarios

### 5. **Error Handling**
- Ensure proper error responses
- Test edge cases and invalid inputs

---

## 🚨 Common Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied. Teacher role required."
}
```

### 404 Not Found
```json
{
  "error": "Route not found"
}
```

### 409 Conflict
```json
{
  "error": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 📝 Notes

- All dates should be in `YYYY-MM-DD` format
- JWT tokens expire after 24 hours
- Password must be at least 6 characters long
- Attendance status can be: `present`, `absent`, or `late`
- Teacher role is required for updating/deleting attendance
