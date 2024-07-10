import React, { useState } from 'react';
import Joblist from './joblist';

const CreateJob = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
    requirements: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prevJob => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      });
      if (!response.ok) {
        throw new Error('Failed to create job listing');
      }
 
      console.log('Job listing created successfully');
    } catch (error) {
      console.error('Error creating job listing:', error);
    }
  };

  return (
    <div>
      <div>
         <Joblist/>
       </div>
      <h2>Create Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />
        <input
          type="text"
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
        />
        <input
          type="text"
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Job Location"
          required
        />
        <input
          type="text"
          name="requirements"
          value={job.requirements}
          onChange={handleChange}
          placeholder="Job Requirements"
          required
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
