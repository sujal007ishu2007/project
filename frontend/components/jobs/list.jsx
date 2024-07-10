import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const List = () => {
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
            
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default List;
