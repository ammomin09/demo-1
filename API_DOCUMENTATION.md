# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Health Check
Check if the server is running.

```
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

### Get All Users
Retrieve all users from the database.

```
GET /users
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "6123abc456def789",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 000-0000",
      "country": "United States",
      "city": "New York",
      "zipCode": "10001",
      "message": "Hello, this is my message",
      "terms": true,
      "createdAt": "2024-04-10T10:30:00.000Z",
      "updatedAt": "2024-04-10T10:30:00.000Z",
      "__v": 0
    }
  ]
}
```

---

### Get User by ID
Retrieve a specific user.

```
GET /users/:id
```

**Parameters:**
- `id` (string) - MongoDB user ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "6123abc456def789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 000-0000",
    "country": "United States",
    "city": "New York",
    "zipCode": "10001",
    "message": "Hello, this is my message",
    "terms": true,
    "createdAt": "2024-04-10T10:30:00.000Z",
    "updatedAt": "2024-04-10T10:30:00.000Z",
    "__v": 0
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### Create User
Register a new user.

```
POST /users
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 000-0000",
  "country": "United States",
  "city": "New York",
  "zipCode": "10001",
  "message": "Hello, this is my message",
  "terms": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "6123abc456def789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 000-0000",
    "country": "United States",
    "city": "New York",
    "zipCode": "10001",
    "message": "Hello, this is my message",
    "terms": true,
    "createdAt": "2024-04-10T10:30:00.000Z",
    "updatedAt": "2024-04-10T10:30:00.000Z",
    "__v": 0
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "First name must be at least 2 characters long, Email is required"
}
```

**Response (409 Conflict):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

### Update User
Update an existing user.

```
PUT /users/:id
Content-Type: application/json
```

**Parameters:**
- `id` (string) - MongoDB user ID

**Request Body:** (Any field can be updated)
```json
{
  "firstName": "Jane",
  "email": "jane@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "6123abc456def789",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "+1 (555) 000-0000",
    "country": "United States",
    "city": "New York",
    "zipCode": "10001",
    "message": "Hello, this is my message",
    "terms": true,
    "createdAt": "2024-04-10T10:30:00.000Z",
    "updatedAt": "2024-04-10T10:35:00.000Z",
    "__v": 0
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Email is invalid"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### Delete User
Delete a user.

```
DELETE /users/:id
```

**Parameters:**
- `id` (string) - MongoDB user ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "_id": "6123abc456def789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 000-0000",
    "country": "United States",
    "city": "New York",
    "zipCode": "10001",
    "message": "Hello, this is my message",
    "terms": true,
    "createdAt": "2024-04-10T10:30:00.000Z",
    "updatedAt": "2024-04-10T10:30:00.000Z",
    "__v": 0
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

## Validation Rules

### Field Requirements

| Field | Type | Required | Min Length | Max Length | Pattern |
|-------|------|----------|-----------|-----------|---------|
| firstName | String | Yes | 2 | 30 | Letters only |
| lastName | String | Yes | 2 | 30 | Letters only |
| email | String | Yes | - | - | Valid email |
| phone | String | Yes | 10 digits | - | Numbers & symbols |
| country | String | Yes | - | - | - |
| city | String | Yes | 2 | - | - |
| zipCode | String | Yes | - | - | Alphanumeric |
| message | String | No | 10 | 1000 | - |
| terms | Boolean | Yes | - | - | Must be true |

---

## Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | User created successfully |
| 400 | Bad Request | Validation failed |
| 404 | Not Found | User doesn't exist |
| 409 | Conflict | Email already exists |
| 500 | Internal Server Error | Server error |

---

## cURL Examples

### Get All Users
```bash
curl http://localhost:5000/api/users
```

### Create a User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 000-0000",
    "country": "United States",
    "city": "New York",
    "zipCode": "10001",
    "message": "This is a test message",
    "terms": true
  }'
```

### Get User by ID
```bash
curl http://localhost:5000/api/users/6123abc456def789
```

### Update User
```bash
curl -X PUT http://localhost:5000/api/users/6123abc456def789 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "email": "jane@example.com"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:5000/api/users/6123abc456def789
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## JavaScript/Fetch Examples

### Get All Users
```javascript
fetch('http://localhost:5000/api/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Create a User
```javascript
fetch('http://localhost:5000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 000-0000',
    country: 'United States',
    city: 'New York',
    zipCode: '10001',
    message: 'This is a test message',
    terms: true
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider implementing:
- Request rate limiting per IP
- API key authentication
- Throttling for bulk operations

---

## CORS

The API includes CORS headers allowing requests from:
```
http://localhost:5173 (development)
```

In production, update `CLIENT_URL` in `.env` for proper CORS.

---

## Authentication

Currently, no authentication is implemented. For production, add:
- JWT tokens
- API key validation
- Role-based access control
- Request signing
