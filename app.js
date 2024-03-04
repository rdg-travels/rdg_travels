require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(bodyParser.json());

// Enable CORS for the relevant route
app.use('/booking-flight', cors({
  origin: 'https://rdg-travels.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.post('/booking-flight', [
  // Validate form fields
  body('flyingFrom').notEmpty().withMessage('Flying From is required'),
  body('flyingTo').notEmpty().withMessage('Flying To is required'),
  body('leavingOn').isISO8601().withMessage('Invalid leaving date format'),
  body('returningOn').isISO8601().withMessage('Invalid returning date format'),
  body('fullName').notEmpty().withMessage('Full Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('passengers').isInt({ min: 1 }).withMessage('Number of passengers must be at least 1'),
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return validation errors to the client
    return res.status(400).json({ errors: errors.array() });
  }
  const { flyingFrom, flyingTo, leavingOn, returningOn, fullName, email, phone, passengers } = req.body;

  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

  // Fill the form
  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'New Flight Booking',
    text: `Flying From: ${flyingFrom}\nFlying To: ${flyingTo}\nLeaving On: ${leavingOn}\nReturning On: ${returningOn}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phone}\nNumber of Passengers: ${passengers}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Flight booked successfully!');
    }
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
