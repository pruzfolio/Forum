import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Make the login API request
      const response = await fetch('http://localhost:8000/token/', {  // Ensure this is your correct API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // If login is successful, store the JWT token and navigate to posts page
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access); // Store JWT token in localStorage
        navigate('/posts');  // Redirect to posts page
      } else {
        const data = await response.json();
        setError(data.detail || 'Invalid credentials');  // Show error if login fails
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-48">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
