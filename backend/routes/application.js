const express = require('express');
const router = express.Router();
const Application = require('../models/application');

// Create a new job application
router.post('/', async (req, res) => {
  const { jobTitle, jobDescription, skills, about, applicantName, applicantEmail } = req.body;

  if (!jobTitle || !jobDescription || !skills || !about || !applicantName || !applicantEmail) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const newApplication = new Application({
      jobTitle,
      jobDescription,
      skills,
      about,
      applicantName,
      applicantEmail
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch applications for a specific applicant
router.get('/applicant/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const applications = await Application.find({ applicantEmail: email });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications for applicant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
