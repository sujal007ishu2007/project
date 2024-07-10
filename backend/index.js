const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const User = require('./models/users');
const jobRoutes = require('./routes/job');
const userRoutes = require('./routes/user');
const applicationRoutes = require('./routes/application'); // Import the applications route

const app = express();
const port =  process.env.PORT  ||8000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100 MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Resumes Only!');
        }
    }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/job-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes); // Use the applications route

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
});

// Register route with file upload using multer
app.post('/api/users/register', upload.single('resume'), async (req, res) => {
    const { username, email, password, role, companyName, companyAddress, contactNumber } = req.body;
    const resume = req.file ? req.file.path : null; // Get file path if uploaded

    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const newUser = new User({
            username,
            email,
            password,
            role,
            resume,
            employerDetails: role === 'employer' ? { companyName, companyAddress, contactNumber } : undefined
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start server
app.listen(port, (error) => {
    if (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
