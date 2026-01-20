import { useState, useEffect } from 'react';
import { authAPI, tasksAPI } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  
  // Auth form states
  const [authForm, setAuthForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      loadTasks();
    }
  }, []);

  const loadTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = showLogin
        ? await authAPI.login(authForm.username, authForm.password)
        : await authAPI.register(authForm.username, authForm.email, authForm.password);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTasks([]);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await tasksAPI.createTask(newTask);
      setTasks([response.data, ...tasks]);
      setNewTask({ title: '', description: '', priority: 'medium' });
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const response = await tasksAPI.updateTask(task.id, { ...task, completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm('Delete this task?')) return;
    
    try {
      await tasksAPI.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1>📝 TaskMaster</h1>
          <p className="subtitle">Your Personal Task Manager</p>
          
          {error && <div className="error">{error}</div>}
          
          <form onSubmit={handleAuth}>
            <input
              type="text"
              placeholder="Username"
              value={authForm.username}
              onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
              required
            />
            
            {!showLogin && (
              <input
                type="email"
                placeholder="Email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
              />
            )}
            
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              required
            />
            
            <button type="submit" className="btn-primary">
              {showLogin ? 'Login' : 'Register'}
            </button>
          </form>
          
          <p className="toggle-auth">
            {showLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setShowLogin(!showLogin)}>
              {showLogin ? 'Register' : 'Login'}
            </span>
          </p>

          <div className="demo-credentials">
            <strong>Demo Account:</strong><br />
            Username: admin<br />
            Password: querty@123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <header>
        <div className="header-content">
          <h1>📝 TaskMaster</h1>
          <div className="user-info">
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="add-task-section">
            <h2>Add New Task</h2>
            <form onSubmit={handleAddTask} className="task-form">
              <input
                type="text"
                placeholder="Task title..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description (optional)..."
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div className="form-row">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <button type="submit" className="btn-primary">Add Task</button>
              </div>
            </form>
          </div>

          <div className="tasks-section">
            <h2>My Tasks ({tasks.length})</h2>
            
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>🎉 No tasks yet! Add your first task above.</p>
              </div>
            ) : (
              <div className="tasks-grid">
                {tasks.map(task => (
                  <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
                    <div className="task-header">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task)}
                      />
                      <h3>{task.title}</h3>
                      <button onClick={() => handleDeleteTask(task.id)} className="btn-delete">
                        🗑️
                      </button>
                    </div>
                    
                    {task.description && <p className="task-description">{task.description}</p>}
                    
                    <div className="task-footer">
                      <span className={`priority-badge priority-${task.priority}`}>
                        {task.priority.toUpperCase()}
                      </span>
                      <span className="task-date">
                        {new Date(task.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;