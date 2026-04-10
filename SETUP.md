# Quick Start Guide

## One-Time Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure MongoDB

#### Option A: Using MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update `.env` file:
```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/demo-1?retryWrites=true&w=majority
```

#### Option B: Using Local MongoDB
1. Install MongoDB from https://docs.mongodb.com/manual/installation/
2. Start MongoDB service
3. Update `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/demo-1
```

### Step 3: Start the Application
```bash
npm run dev
```

That's it! 🎉

Open your browser and navigate to:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## What You Can Do

1. **Register Users** - Fill the form on the left with user details
2. **View Users** - See all registered users on the right
3. **Edit Users** - Click the pencil icon to edit a user
4. **Delete Users** - Click the X icon to remove a user (with confirmation)

---

## Data Being Collected

- First Name
- Last Name
- Email (must be unique)
- Phone Number
- Country
- City
- ZIP Code
- Message (optional)
- Terms & Conditions (required)

---

## File Structure Explained

**Frontend** (`/src`):
- `components/` - React components
- `styles/` - CSS files
- `utils/` - Helper functions and API calls
- `App.jsx` - Main application component

**Backend** (`/server`):
- `models/` - Database schemas
- `controllers/` - Business logic
- `routes/` - API endpoints
- `config/` - Database setup
- `middleware/` - Request handlers

---

## Common Commands

```bash
# Start development servers (both frontend & backend)
npm run dev

# Start only backend server
npm run server

# Start only frontend dev server
npm run client

# Build frontend for production
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

**Problem**: "Cannot find module"
**Solution**: Run `npm install`

**Problem**: MongoDB connection fails
**Solution**: Check your MONGODB_URI in .env

**Problem**: Port 5000 or 5173 already in use
**Solution**: Change port in .env or kill the process using that port

**Problem**: Form submissions fail
**Solution**: 
1. Check backend is running (terminal should show "Server running on port 5000")
2. Check MongoDB is connected
3. Open browser console (F12) to see error details

---

## Testing the API

Using cURL:
```bash
# Get all users
curl http://localhost:5000/api/users

# Create a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","phone":"5550000000","country":"USA","city":"NYC","zipCode":"10001","message":"Hello","terms":true}'

# Get specific user (replace ID)
curl http://localhost:5000/api/users/6123abc456def789

# Check server health
curl http://localhost:5000/api/health
```

---

## Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose ODM](https://mongoosejs.com)
- [React Hook Form](https://react-hook-form.com)

---

## When Things Go Wrong

1. **Check the terminal** - Read error messages carefully
2. **Check the browser console** - Press F12 and look at Console tab
3. **Check Network tab** - See what API calls are being made
4. **Restart everything** - Kill terminals and start fresh
5. **Clear cache** - Delete node_modules and reinstall

---

## Next Steps

Once you have this running:
1. Explore the codebase
2. Try modifying the form fields
3. Add new validation rules
4. Create new API endpoints
5. Deploy to production!

Happy coding! 🚀
