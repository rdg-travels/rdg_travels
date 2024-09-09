require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');

// Create a Redis connection
const connection = new IORedis({
  maxRetriesPerRequest: null, // Add this line
});

// Create a queue for background email sending
const emailQueue = new Queue('emailQueue', { connection });

// Worker to process email sending in the background
new Worker('emailQueue', async job => {
  const { mailOptions, transporterConfig } = job.data;
  const transporter = nodemailer.createTransport(transporterConfig);
  await transporter.sendMail(mailOptions);
}, { connection });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Enable CORS for relevant routes
app.use(cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Create transporter config
const transporterConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// Function to enqueue email sending job
function sendEmail(mailOptions) {
  emailQueue.add('sendEmail', { mailOptions, transporterConfig });
}

// Booking Flight Route
app.post('/booking-flight', (req, res) => {
  const { tripType, flyingFrom, flyingTo, leavingOn, returningOn, fullName, email, phone, passengers } = req.body;
  const isOneWay = tripType === 'oneWay';
  const returningDate = isOneWay ? 'N/A' : returningOn;

  const adminMailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Flight Booking',
    text: `Flying From: ${flyingFrom}\nFlying To: ${flyingTo}\nLeaving On: ${leavingOn}\nReturning On: ${returningDate}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phone}\nNumber of Passengers: ${passengers}`,
  };

  sendEmail(adminMailOptions);

  const userMailOptions = {
    from: process.env.EMAIL_2,
    to: email,
    subject: 'Flight Booking Acknowledgment',
    text: `Dear ${fullName},\n\nThank you for booking your flight with us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
  };

  sendEmail(userMailOptions);

  res.send('Flight booked successfully!');
});

app.post('/studying-abroad', (req, res) => {
  const { countryOfInterest, fieldOfStudy, intendedProgram, fullName, email, phoneNumber } = req.body;

  const adminMailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Study Abroad Inquiry',
    text: `Country of Interest: ${countryOfInterest}\nField of Study: ${fieldOfStudy}\nIntended Program: ${intendedProgram}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}`,
  };

  sendEmail(adminMailOptions);

  const userMailOptions = {
    from: process.env.EMAIL_2,
    to: email,
    subject: 'Study Abroad Inquiry Acknowledgement',
    text: `Dear ${fullName},\n\nThank you for your interest in our services to Study Abroad. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
  };

  sendEmail(userMailOptions);

  res.send('Study abroad inquiry submitted successfully!');
});

app.post('/book-hotel', (req, res) => {
  const { location, checkIn, checkOut, guests, fullName, email, phone } = req.body;

  const adminMailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Hotel Booking',
    text: `Location: ${location}\nCheck In: ${checkIn}\nCheck Out: ${checkOut}\nNo of Guests: ${guests}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phone}`,
  };

 	sendEmail(adminMailOptions);

	const userMailOptions = {
    		from: process.env.EMAIL_2,
    		to: email,
    		subject: 'Hotel Booking Acknowledgement',
    		text: `Dear ${fullName},\n\nThank you for booking your Hotel with us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
  };

  sendEmail(userMailOptions);

  res.send('Hotel booked successfully!');
});

app.post('/book-now', (req, res) => {
  const { fullName, email, phoneNumber, packageType } = req.body;

  // Fill the form
  const adminMailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Destination Booking',
    text: `Full Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}\nPackage Type: ${packageType}`,
  };

 sendEmail(adminMailOptions);
 
 const userMailOptions = {
        from: process.env.EMAIL_2,
        to: email,
        subject: 'Travel Package Acknowledgement',
        text: `Dear ${fullName},\n\nThank you for contacting us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
  };

  sendEmail(userMailOptions);

  res.send('Hotel booked successfully!');
});

app.post('/contact-us', (req, res) => {
  const { fullName, emailAddress, phoneNumber, purpose, message } = req.body;

  // Fill the form
  let mailText = `Full Name: ${fullName}\nEmail Address: ${emailAddress}\nPhone Number: ${phoneNumber}\n`;
  if (purpose) {
    mailText += `Purpose of Contact: ${purpose}\n`;
  }
  if (message) {
    mailText += `Message: ${message}`;
  }

  const adminMailOptions = {
    from: emailAddress,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Contact Inquiry',
    text: mailText,
  };

  sendEmail(adminMailOptions);

  res.send('Contact inquiry submitted successfully!');
});

app.post('/subscribe', (req, res) => {
  const {  email } = req.body;

  // Fill the form
  const adminMailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Newsletter Subscription Request',
    text: `Email Address: ${email}`,
  };

 sendEmail(adminMailOptions);
  
  res.send('You have been subscribed successfully!');
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
