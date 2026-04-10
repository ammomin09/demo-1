import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userAPI } from '../utils/api';
import { validationRules } from '../utils/validation';
import '../styles/Form.css';

export const UserForm = ({ onSuccess, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      zipCode: '',
      message: '',
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    
    try {
      if (initialData?._id) {
        await userAPI.updateUser(initialData._id, data);
      } else {
        await userAPI.createUser(data);
      }
      reset();
      onSuccess?.();
    } catch (error) {
      setServerError(
        error.response?.data?.error || 'An error occurred while submitting the form'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>{initialData ? 'Update User' : 'Create New User'}</h2>
      
      {serverError && <div className="error-message server-error">{serverError}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            {...register('firstName', validationRules.firstName)}
            className={errors.firstName ? 'input-error' : ''}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            {...register('lastName', validationRules.lastName)}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email', validationRules.email)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register('phone', validationRules.phone)}
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            id="country"
            type="text"
            placeholder="United States"
            {...register('country', validationRules.country)}
            className={errors.country ? 'input-error' : ''}
          />
          {errors.country && (
            <span className="error-message">{errors.country.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            id="city"
            type="text"
            placeholder="New York"
            {...register('city', validationRules.city)}
            className={errors.city ? 'input-error' : ''}
          />
          {errors.city && (
            <span className="error-message">{errors.city.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">ZIP Code *</label>
          <input
            id="zipCode"
            type="text"
            placeholder="10001"
            {...register('zipCode', validationRules.zipCode)}
            className={errors.zipCode ? 'input-error' : ''}
          />
          {errors.zipCode && (
            <span className="error-message">{errors.zipCode.message}</span>
          )}
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          placeholder="Enter your message (optional)"
          rows="5"
          {...register('message', validationRules.message)}
          className={errors.message ? 'input-error' : ''}
        />
        {errors.message && (
          <span className="error-message">{errors.message.message}</span>
        )}
      </div>

      <div className="form-group checkbox">
        <input
          id="terms"
          type="checkbox"
          {...register('terms', validationRules.terms)}
          className={errors.terms ? 'input-error' : ''}
        />
        <label htmlFor="terms">
          I agree to the terms and conditions *
        </label>
        {errors.terms && (
          <span className="error-message">{errors.terms.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="submit-btn"
      >
        {loading ? 'Submitting...' : (initialData ? 'Update User' : 'Submit')}
      </button>
    </form>
  );
};

export default UserForm;
