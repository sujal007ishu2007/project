// TestConnection.jsx
import React, { useState, useEffect } from 'react';

const TestConnection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to connect to backend');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    checkConnection();
  }, []);

  return (
    <div>
      <h2>Backend Connection Test</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <p style={{ color: 'green' }}>Connected to Backend Successfully!</p>}
    </div>
  );
};

export default TestConnection;
