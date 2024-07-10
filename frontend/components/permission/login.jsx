import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Invalid credentials');
      }
      const data = await response.json();
      console.log('Login successful:', data);
      setError('');
      setSuccess('Login successful!');
      localStorage.setItem('user', JSON.stringify(data)); 
      
      if (data.role === 'employer') {
        navigate('/create');
      } else if (data.role === 'job_seeker') {
        navigate('/application');
      } else {
        setError('Unexpected user role');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter the Email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Enter the Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Login;
