import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobDetail = ({ match }) => {
  const [job, setJob] = useState(null);
  const jobId = match.params.id;

  useEffect(() => {
    fetchJobDetail();
  }, []);

  const fetchJobDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job detail');
      }
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error('Error fetching job detail:', error);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      {job && (
        <div>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.type}</p>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
