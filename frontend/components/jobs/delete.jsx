import React from 'react';

const JobItem = ({ job, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${job._id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete job listing');
      }
      onDelete(job._id); 
      console.log('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job listing:', error);
    }
  };

  return (
    <div>
      <h3>{job.title}</h3>
      <p>Description: {job.description}</p>
      <p>Location: {job.location}</p>
      <p>Company: {job.company}</p>
      <p>Requirements: {job.requirements}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default JobItem;
