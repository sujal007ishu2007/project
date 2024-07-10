
const express = require('express');
const router = express.Router();
const Job = require('../models/job');


router.post('/', async (req, res) => {
  const { title, description, location, company, requirements } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      company,
      requirements
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job listing:', error);
    res.status(500).json({ error: 'Server error: Failed to create job listing' });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching job listings:', error);
    res.status(500).json({ error: 'Server error: Failed to fetch job listings' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: 'Job listing not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Error fetching job listing:', error);
    res.status(500).json({ error: 'Server error: Failed to fetch job listing' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Server error: Failed to update job' });
  }
});




router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job listing not found' });
    }

    res.json({ message: 'Job listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting job listing:', error);
    res.status(500).json({ error: 'Server error: Failed to delete job listing' });
  }
});

module.exports = router;
