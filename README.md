# User Registration System - Full Stack React Application

A comprehensive full-stack web application built with React, Node.js/Express, and MongoDB. Features complete form validation, database integration, and a responsive user interface.

## Features

- ✅ **Form Validation**: Client-side and server-side validation using react-hook-form and Mongoose schemas
- ✅ **Database Integration**: MongoDB connection with Mongoose ODM
- ✅ **RESTful API**: Complete CRUD operations for user management
- ✅ **Responsive Design**: Mobile-friendly UI with CSS Grid and Flexbox
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Edit & Delete**: Full user management capabilities
- ✅ **Real-time Updates**: Instant UI updates after form submissions

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **react-hook-form** - Form validation
- **axios** - HTTP client
- **CSS3** - Styling with custom properties

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **nodemon** - Development auto-reload

## Project Structure

```
demo-1/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── UserForm.jsx         # User registration form with validation
│   │   └── UserList.jsx         # Display and manage users
│   ├── styles/
│   │   ├── Form.css             # Form styling
│   │   └── UserList.css         # User list styling
│   ├── utils/
│   │   ├── api.js               # API client
│   │   └── validation.js        # Validation rules and functions
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styling
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
│
├── server/                       # Backend source code
│   ├── config/
│   │   └── database.js          # MongoDB configuration
│   ├── models/
│   │   └── User.js              # User schema and model
│   ├── controllers/
│   │   └── userController.js    # Business logic for users
│   ├── routes/
│   │   └── users.js             # User API routes
│   ├── middleware/
│   │   └── errorMiddleware.js   # Error handling middleware
│   └── server.js                # Express server setup
│
├── .env                         # Environment variables
├── .env.example                 # Example environment file
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── index.html                   # HTML entry point
└── README.md                    # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd demo-1

# Install all dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB URI:

**Option A: Using MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/demo-1?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

**Option B: Using Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/demo-1
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB (if using local)

```bash
# Windows (if MongoDB is installed)
mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### 4. Run the Application

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/health` - Server health check

### Example API Call (cURL)

```bash
# Create a new user
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

## Validation Rules

### Client-Side (React Hook Form)
- **First Name / Last Name**: 2-30 characters, letters only
- **Email**: Valid email format
- **Phone**: 10+ digits, can include special characters
- **Country / City**: Required fields
- **ZIP Code**: Alphanumeric with hyphens
- **Message**: 10-1000 characters (optional)
- **Terms**: Must be accepted

### Server-Side (Mongoose)
Same validation rules are enforced on the backend to ensure data integrity.

## Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## Features Explained

### Form Validation
- **Real-time validation** with error messages
- **Client-side** validation for instant feedback
- **Server-side** validation for data integrity
- **Custom validation rules** for complex scenarios

### Database Integration
- **Mongoose schemas** with built-in validation
- **Unique constraints** (email must be unique)
- **Timestamps** (createdAt, updatedAt)
- **Error handling** for database operations

### User Management
- **Create**: Register new users with validation
- **Read**: View all users and individual user details
- **Update**: Edit existing user information
- **Delete**: Remove users with confirmation

## Error Handling

The application handles various error scenarios:
- **Validation errors**: Clear error messages for each field
- **Duplicate emails**: Prevents registering with existing email
- **Network errors**: Displays user-friendly error messages
- **Server errors**: Comprehensive error logging

## Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (640px and up)
- 💻 Desktops (968px and up)

## Development Tips

### Hot Reload
Both frontend and backend support hot reload during development with nodemon and Vite.

### Browser DevTools
React Developer Tools extension is recommended for debugging React components.

### Database Inspection
Use MongoDB Compass to inspect your database collections and documents.

### API Testing
Use Postman or similar tools to test API endpoints independently.

## Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running
- Check your MONGODB_URI in .env
- If using Atlas, check whitelist settings

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# Or kill process using port
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

- [ ] User authentication (JWT)
- [ ] Password hashing and security
- [ ] Image upload functionality
- [ ] Email verification
- [ ] Role-based access control
- [ ] User search and filtering
- [ ] Pagination for large datasets
- [ ] Data export (CSV/PDF)
- [ ] Admin dashboard
- [ ] Activity logging

## Performance Optimization

- Lazy loading components
- Code splitting with Vite
- Database indexing on frequently queried fields
- Caching strategies
- Image optimization
- Minification and bundling

## Security Considerations

- ✅ CORS enabled
- ✅ Input validation (client & server)
- ✅ Mongoose schema validation
- ✅ Error messages don't expose sensitive info
- ⚠️ TODO: Add authentication/authorization
- ⚠️ TODO: Implement rate limiting
- ⚠️ TODO: Add HTTPS in production
- ⚠️ TODO: Sanitize inputs

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email support@example.com or create an issue in the repository.

---

Built with ❤️ using React, Node.js, and MongoDB