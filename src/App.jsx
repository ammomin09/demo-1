import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleFormSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setSelectedUser(null);
    // Show success message
    alert('Operation completed successfully!');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>User Registration System</h1>
          <p>Full-Stack React Application with Validation & Database</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="layout">
            <aside className="sidebar">
              <div className="form-wrapper">
                {selectedUser && (
                  <button
                    className="cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    ← Back to Form
                  </button>
                )}
                <UserForm
                  onSuccess={handleFormSuccess}
                  initialData={selectedUser}
                />
              </div>
            </aside>

            <section className="main-content">
              <UserList
                refreshTrigger={refreshTrigger}
                onEdit={handleEditUser}
                onDelete={handleDeleteSuccess}
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 User Registration System. Built with React & Node.js</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
