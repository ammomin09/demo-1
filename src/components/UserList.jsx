import { useState, useEffect } from 'react';
import { userAPI } from '../utils/api';
import '../styles/UserList.css';

export const UserList = ({ refreshTrigger, onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userAPI.getAllUsers();
      setUsers(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
        onDelete?.();
      } catch (err) {
        setError('Failed to delete user.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="no-data">No users found. Create one to get started!</div>;
  }

  return (
    <div className="user-list-container">
      <h2>Registered Users ({users.length})</h2>
      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-header">
              <h3>{user.firstName} {user.lastName}</h3>
              <div className="user-actions">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(user)}
                  title="Edit User"
                >
                  ✎
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user._id)}
                  title="Delete User"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="user-info">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Location:</strong> {user.city}, {user.country} {user.zipCode}</p>
              {user.message && (
                <p><strong>Message:</strong> {user.message.substring(0, 100)}...</p>
              )}
            </div>
            <div className="user-footer">
              <small>Joined: {new Date(user.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
