import React, { useState } from 'react';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'job_seeker', // default value
    resume: null, // field for job seekers
    employerDetails: {
      companyName: '',
      companyAddress: '',
      contactNumber: ''
    } // fields for employers
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setUser(prevUser => ({
        ...prevUser,
        resume: files[0] || null
      }));
    } else if (name in user.employerDetails) {
      setUser(prevUser => ({
        ...prevUser,
        employerDetails: {
          ...prevUser.employerDetails,
          [name]: value
        }
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    if (user.role === 'job_seeker' && user.resume) {
      formData.append('resume', user.resume);
    } else if (user.role === 'employer') {
      formData.append('companyName', user.employerDetails.companyName);
      formData.append('companyAddress', user.employerDetails.companyAddress);
      formData.append('contactNumber', user.employerDetails.contactNumber);
    }

    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to register');
      }
      const data = await response.json();
      console.log('Registration successful:', data);

      if (data.message) {
        setError('');
        setSuccess(data.message);
      } else {
        setError('Failed to register. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Failed to register. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Enter the Username'
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          placeholder='Enter the Email'
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder='Enter the Password'
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        {user.role === 'job_seeker' && (
          <input
            placeholder='Upload Resume'
            type="file"
            name="resume"
            onChange={handleChange}
            required
          />
        )}
        {user.role === 'employer' && (
          <>
            <input
              placeholder='Enter Company Name'
              type="text"
              name="companyName"
              value={user.employerDetails.companyName}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Enter Company Address'
              type="text"
              name="companyAddress"
              value={user.employerDetails.companyAddress}
              onChange={handleChange}
              required
            />
            <input
              placeholder='Enter Contact Number'
              type="text"
              name="contactNumber"
              value={user.employerDetails.contactNumber}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Register;
