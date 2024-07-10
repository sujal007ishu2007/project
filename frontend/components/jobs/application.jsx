import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './list.css'; // Import the CSS file

const List = () => {
  const [jobs, setJobs] = useState([]);
  const [application, setApplication] = useState({
    jobTitle: '',
    jobDescription: '',
    skills: '',
    about: '',
    applicantName: '', // Add applicantName
    applicantEmail: '' // Add applicantEmail
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication(prevApplication => ({
      ...prevApplication,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting application:', application); // Log application data
    try {
      const response = await fetch('http://localhost:8000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to submit application');
      }
      const data = await response.json();
      console.log('Application submitted successfully:', data);

      if (data.message) {
        setError('');
        setSuccess(data.message);
      } else {
        setError('Failed to submit application. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="box">
      <div>
        <h1>Job Listings</h1>
        <ul>
          {jobs.map(job => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Requirements:</b> {job.requirements}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Job Application Form</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Enter your Name'
            type="text"
            name="applicantName"
            value={application.applicantName}
            onChange={handleChange}
            required
          />
          <input
            placeholder='Enter your Email'
            type="email"
            name="applicantEmail"
            value={application.applicantEmail}
            onChange={handleChange}
            required
          />
          <input
            placeholder='Enter the Job Title'
            type="text"
            name="jobTitle"
            value={application.jobTitle}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder='Enter the Job Description'
            name="jobDescription"
            value={application.jobDescription}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder='Enter your Skills'
            name="skills"
            value={application.skills}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder='Tell us about yourself'
            name="about"
            value={application.about}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Application</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </div>
    </div>
  );
};

export default List;
