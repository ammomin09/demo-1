import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [30, 'First name cannot exceed 30 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [30, 'Last name cannot exceed 30 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9\-\+\(\)\s]+$/, 'Please provide a valid phone number'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required'],
    },
    message: {
      type: String,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    terms: {
      type: Boolean,
      required: [true, 'You must agree to terms and conditions'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
