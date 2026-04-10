// Validation schemas and utility functions

export const validationRules = {
  firstName: {
    required: 'First name is required',
    minLength: {
      value: 2,
      message: 'First name must be at least 2 characters',
    },
    maxLength: {
      value: 30,
      message: 'First name cannot exceed 30 characters',
    },
    pattern: {
      value: /^[a-zA-Z\s]*$/,
      message: 'First name can only contain letters',
    },
  },
  lastName: {
    required: 'Last name is required',
    minLength: {
      value: 2,
      message: 'Last name must be at least 2 characters',
    },
    maxLength: {
      value: 30,
      message: 'Last name cannot exceed 30 characters',
    },
    pattern: {
      value: /^[a-zA-Z\s]*$/,
      message: 'Last name can only contain letters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please provide a valid email address',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9\-\+\(\)\s]+$/,
      message: 'Please provide a valid phone number',
    },
    minLength: {
      value: 10,
      message: 'Phone number must be at least 10 digits',
    },
  },
  country: {
    required: 'Country is required',
  },
  city: {
    required: 'City is required',
    minLength: {
      value: 2,
      message: 'City must be at least 2 characters',
    },
  },
  zipCode: {
    required: 'ZIP code is required',
    pattern: {
      value: /^[a-zA-Z0-9\s\-]*$/,
      message: 'Please provide a valid ZIP code',
    },
  },
  message: {
    minLength: {
      value: 10,
      message: 'Message must be at least 10 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Message cannot exceed 1000 characters',
    },
  },
  terms: {
    required: 'You must agree to the terms and conditions',
  },
};

// Validation functions
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[0-9\-\+\(\)\s]+$/;
  return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateZipCode = (zipCode) => {
  const regex = /^[a-zA-Z0-9\s\-]*$/;
  return regex.test(zipCode);
};

export const validateName = (name) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(name) && name.trim().length >= 2;
};
