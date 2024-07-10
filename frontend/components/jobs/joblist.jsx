import React, { useState, useEffect } from 'react';
import EditJobForm from './edit';
import { Link, useNavigate } from 'react-router-dom';
const JobList = () => {
  const [jobs, setJobs] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      setJobs(jobs.filter(job => job._id !== id));
      alert('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };
  const handleEdit = (jobId) => {
    navigate(`/jobs/edit/${jobId}`);
  };
  return (
    
      <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <h2>{job.title}</h2>
           
            <p>{job.description}</p>
            <p><b>Company:</b>{job.company}</p>
            <p><b>location:</b>{job.location}</p>
            <p><b>Requirments:</b>{job.requirements}</p>
            <div>
            <button onClick={() => handleEdit(job._id)}>Edit</button>
             
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </div>

    
  );
};

export default JobList;
