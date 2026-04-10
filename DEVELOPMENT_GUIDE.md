# Development Guide

## Project Architecture

This is a **full-stack JavaScript application** with clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│           Frontend (React + Vite)               │
│  - User Interface                               │
│  - Form Validation                              │
│  - API Communication                            │
└──────────┬──────────────────────────────────────┘
           │ HTTP/JSON (REST API)
┌──────────▼──────────────────────────────────────┐
│         Backend (Node.js + Express)             │
│  - API Routes                                   │
│  - Business Logic                               │
│  - Database Operations                          │
└──────────┬──────────────────────────────────────┘
           │ MongoDB Protocol
┌──────────▼──────────────────────────────────────┐
│    Database (MongoDB + Mongoose)                │
│  - User Documents                               │
│  - Schema Validation                            │
│  - Data Persistence                             │
└─────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Component Structure
```
App (Main Container)
├── UserForm (Left Sidebar)
│   ├── Form inputs
│   └── Validation errors
└── UserList (Right Main Content)
    ├── User cards (grid)
    ├── Edit buttons
    └── Delete buttons
```

### Data Flow
```
User Input → Form Validation → API Call → Response Handling → UI Update
   ↓           ↓                  ↓           ↓                  ↓
 Event      react-hook-form    axios      Error checks      useState
Handler       Rules           POST/PUT/GET  Message         setUsers
```

### Key Components

**UserForm.jsx**
- Uses `react-hook-form` for form state management
- Applies validation rules from `validation.js`
- Sends data to API via axios
- Handles loading and error states
- Supports both create and update modes

**UserList.jsx**
- Fetches users from API on mount
- Displays users in responsive grid
- Handles delete operations
- Triggers parent component refresh

**App.jsx**
- Manages global state (refreshTrigger, selectedUser)
- Handles user selection for editing
- Coordinates between form and list

### Utils
- **api.js**: Centralized API calls with axios
- **validation.js**: Validation rules and helper functions

---

## Backend Architecture

### Request-Response Cycle
```
HTTP Request
    ↓
Express Router (/api/users)
    ↓
Controller (userController.js)
    ├─ Validation
    ├─ Business Logic
    └─ Database Query
    ↓
Mongoose Model
    ├─ Schema Validation
    └─ MongoDB Query
    ↓
Response Object
    ↓
HTTP Response
```

### Key Files

**server.js**
- Express app initialization
- Middleware setup (CORS, JSON parser)
- Route mounting
- Error handling

**routes/users.js**
- API endpoint definitions
- Route-to-controller mapping
- RESTful convention

**controllers/userController.js**
- Business logic implementation
- Database operations
- Error handling and responses
- Validation error formatting

**models/User.js**
- Mongoose schema definition
- Field validation
- Custom validators
- Constraints (unique, required, etc.)

**config/database.js**
- MongoDB connection setup
- Connection error handling
- Environment configuration

**middleware/errorMiddleware.js**
- Error catching and formatting
- 404 handling
- Consistent error responses

---

## Data Flow Examples

### Create User Flow
```
Frontend:
1. User fills form
2. react-hook-form validates client-side
3. onClick submit button
4. POST /api/users with data
5. Receive response
6. Reset form
7. Refresh user list

Backend:
1. Express receives POST request
2. Body parser extracts JSON
3. createUser controller called
4. Mongoose validates against schema
5. Check for duplicate email
6. Insert into MongoDB
7. Return created user with 201 status
8. Handle validation errors (400 status)
```

### Update User Flow
```
Frontend:
1. Click edit button
2. Load user data into form
3. Modify fields
4. Submit form
5. PUT /api/users/{id} with data
6. Success: refresh list, clear form
7. Error: show error message

Backend:
1. Express receives PUT request
2. Extract ID from URL params
3. Extract new data from body
4. updateUser controller called
5. Mongoose finds and updates with validation
6. Return updated user with 200 status
7. Handle errors appropriately
```

### Delete User Flow
```
Frontend:
1. Click delete button
2. Show confirmation dialog
3. If confirmed: DELETE /api/users/{id}
4. Success: remove from list
5. Show success message

Backend:
1. Express receives DELETE request
2. Extract ID from URL params
3. deleteUser controller called
4. Mongoose finds and deletes
5. Return deleted user with 200 status
```

---

## Code Organization Best Practices

### 1. Separation of Concerns
- **Components**: UI logic only
- **Utils**: Helper functions and utilities
- **Controllers**: Business logic
- **Models**: Data structure and validation
- **Routes**: API endpoint mapping

### 2. Error Handling
- Client-side: Form validation + error display
- Server-side: Try-catch blocks in controllers
- Consistent error response format
- User-friendly error messages

### 3. Validation Strategy
- **First Line**: Client-side React Hook Form
- **Second Line**: Server-side Mongoose schema
- **Logic**: Email uniqueness constraint
- **Response**: Detailed error messages

### 4. API Design
- RESTful endpoints
- Proper HTTP methods (GET, POST, PUT, DELETE)
- Consistent response format
- Appropriate status codes

### 5. Configuration
- Environment variables (.env)
- Separate configs per environment
- Sensitive data in .env
- Non-sensitive defaults in code

---

## Development Workflow

### 1. Make Changes
```bash
# Frontend changes automatically reload (Vite)
# Backend changes require restart (nodemon handles this)
```

### 2. Test Changes
```bash
# Browser: http://localhost:5173 (frontend)
# Terminal: Check for error messages
# Browser Console (F12): Check for JavaScript errors
# Network Tab: Monitor API calls
```

### 3. Debug Issues

**Frontend Debugging**:
```javascript
// Use console.log
console.log('Data:', data);

// React DevTools Chrome extension
// Check component props and state

// Network tab to inspect API responses
```

**Backend Debugging**:
```javascript
// Check server terminal for logs
// Add console.log in controllers
// Check MongoDB with MongoDB Compass
// Test API with cURL or Postman
```

### 4. Common Modifications

**Add New Form Field**:
1. Edit `server/models/User.js` - add field with validation
2. Edit `src/utils/validation.js` - add validation rules
3. Edit `src/components/UserForm.jsx` - add input element
4. Edit documentation

**Change Validation Rules**:
1. Update `server/models/User.js` (server-side)
2. Update `src/utils/validation.js` (client-side)
3. Test form submission with valid/invalid data

**Add New API Endpoint**:
1. Create route in `server/routes/`
2. Create controller function in `server/controllers/`
3. Create API function in `src/utils/api.js`
4. Use in component

---

## Performance Considerations

### Frontend
- Vite provides fast build times
- React DevTools for performance profiling
- Lazy loading components possible
- CSS-in-JS alternatives: styled-components, emotion

### Backend
- Mongoose connection pooling
- MongoDB indexes for frequently queried fields
- Query optimization
- Caching strategies

### Database
- Index `email` field (already unique)
- Consider pagination for large datasets
- Use projections to select specific fields
- Proper indexing on filter criteria

---

## Security Considerations

### Current Implementation
✅ CORS enabled for frontend
✅ Input validation (client & server)
✅ Mongoose schema validation
✅ Error messages don't expose sensitive info
✅ No credentials in code

### TODO for Production
- ⚠️ Add JWT authentication
- ⚠️ Hash passwords with bcrypt
- ⚠️ Implement rate limiting
- ⚠️ Add HTTPS
- ⚠️ Sanitize inputs
- ⚠️ Add request logging
- ⚠️ Implement CSRF protection
- ⚠️ Add security headers

---

## Testing Strategy

### Manual Testing
1. Fill form with valid data
2. Submit and verify in database
3. Fill form with invalid data
4. Verify error messages
5. Edit user and verify changes
6. Delete user and verify removal

### Automated Testing (TODO)
- Jest for unit tests
- React Testing Library for components
- Supertest for API routes
- MongoDB Memory Server for tests

### API Testing
```bash
# Using curl
curl -X GET http://localhost:5000/api/users

# Using Postman
# Create request collection with all endpoints

# Using JavaScript fetch
fetch('http://localhost:5000/api/users')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## File Modification Guide

### To Add Database Field:
1. **server/models/User.js**: Add to schema
2. **src/utils/validation.js**: Add validation rule
3. **src/components/UserForm.jsx**: Add form input
4. **API_DOCUMENTATION.md**: Update docs

### To Change Validation:
1. **server/models/User.js**: Edit validators
2. **src/utils/validation.js**: Update rules
3. Test thoroughly

### To Modify API Endpoint:
1. **server/routes/users.js**: Update route
2. **server/controllers/userController.js**: Update logic
3. **src/utils/api.js**: Update call
4. **API_DOCUMENTATION.md**: Update docs

---

## Troubleshooting Guide

### Form Submit Fails
1. Check browser console (F12)
2. Check Network tab for API response
3. Check server logs for errors
4. Verify MongoDB is running
5. Check validation rules

### Page Doesn't Load
1. Check frontend build errors
2. Clear browser cache
3. Check localhost:5173 is accessible
4. Check Vite dev server status

### Data Doesn't Save
1. Check MongoDB connection
2. Verify .env MONGODB_URI
3. Check server logs
4. Test API with cURL

### Backend Won't Start
1. Check port 5000 is available
2. Verify Node.js is installed
3. Check npm install completed
4. Check .env file exists

---

## Git Workflow

### Commits
```bash
git add .
git commit -m "Add description of changes"
git push origin main
```

### Branches (for large features)
```bash
git checkout -b feature/new-feature
# Make changes
git commit -m "Implement feature"
git push origin feature/new-feature
# Create pull request
```

---

## Deployment Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Build completes without errors
- [ ] All tests passing
- [ ] Error messages finalized
- [ ] Security review completed
- [ ] HTTPS enabled
- [ ] CORS configured for production domain
- [ ] Database backups configured
- [ ] Monitoring/logging setup

---

## Learning Resources

### Frontend
- [React Docs](https://react.dev)
- [React Hook Form](https://react-hook-form.com)
- [Vite Guide](https://vitejs.dev/guide/)

### Backend
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Database
- [MongoDB](https://docs.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Full Stack
- [REST API Design](https://restfulapi.net/)
- [Web Security](https://owasp.org/)

---

This guide should help you understand and extend the application. Happy coding! 🚀
