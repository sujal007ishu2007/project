import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
    requirements: ''
  }); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log(`Fetching details for job ID: ${id}`);
        const response = await fetch(`http://localhost:8000/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        console.log('Fetched job data:', data);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

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
      if (!id) {
        console.error('jobId is undefined');
        return;
      }
      console.log('Updating job with data:', job);
      const response = await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update job: ${errorMessage}`);
      }
      console.log('Job updated successfully');
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
     
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>Job not found or failed to fetch details.</div>;
  }

  return (
    <div>
      <div></div>
      <h2>Edit Job</h2>
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
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobForm;
