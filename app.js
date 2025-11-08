require('dotenv').config();

const express = require('express');
// const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Create transporter config
const transporterConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  connectionTimeout: 30000,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
  requireTLS: true
};

const transporter = nodemailer.createTransport(transporterConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Enable CORS for relevant routes
app.use(cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Function to enqueue email sending job
function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions).catch(err => {
      console.error('Email send failed (in background):', err);
    });
}

// Booking Flight Route
app.post('/booking-flight', async(req, res) => {
  try {
    const { tripType, flyingFrom, flyingTo, leavingOn, returningOn, fullName, email, phone, passengers } = req.body;
    const isOneWay = tripType === 'oneWay';
    const returningDate = isOneWay ? 'N/A' : returningOn;
  
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_2,
      replyTo: email,
      subject: 'New Flight Booking',
      text: `Flying From: ${flyingFrom}\nFlying To: ${flyingTo}\nLeaving On: ${leavingOn}\nReturning On: ${returningDate}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phone}\nNumber of Passengers: ${passengers}`,
    };
  
    sendEmail(adminMailOptions);
  
    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Flight Booking Acknowledgment',
      text: `Dear ${fullName},\n\nThank you for booking your flight with us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
    };
  
     sendEmail(userMailOptions);
  
     res.status(201).json({ message: 'Flight booked successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the flight.' });
  }
});

app.post('/studying-abroad', async (req, res) => {
  try {
    const { countryOfInterest, fieldOfStudy, intendedProgram, fullName, email, phoneNumber } = req.body;

    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_2,
      replyTo: email,
      subject: 'New Study Abroad Inquiry',
      text: `Country of Interest: ${countryOfInterest}\nField of Study: ${fieldOfStudy}\nIntended Program: ${intendedProgram}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}`,
    };
  
    sendEmail(adminMailOptions);
  
    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Study Abroad Inquiry Acknowledgement',
      text: `Dear ${fullName},\n\nThank you for your interest in our services to Study Abroad. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
    };
  
    sendEmail(userMailOptions);
  
    res.status(201).json({ message: 'Study abroad inquiry submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while inquiring about study abroad.' });
  }
});

app.post('/book-hotel', async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests, fullName, email, phone } = req.body;

    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_2,
      replyTo: email,
      subject: 'New Hotel Booking',
      text: `Location: ${location}\nCheck In: ${checkIn}\nCheck Out: ${checkOut}\nNo of Guests: ${guests}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phone}`,
    };
  
    sendEmail(adminMailOptions);
  
    const userMailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'Hotel Booking Acknowledgement',
          text: `Dear ${fullName},\n\nThank you for booking your Hotel with us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
    };
  
    sendEmail(userMailOptions);
  
    res.status(201).json({ message: 'Hotel booked successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the hotel.' });
  }
});

app.post('/book-now', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, packageType } = req.body;

    // Fill the form
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_2,
      replyTo: email,
      subject: 'New Destination Booking',
      text: `Full Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}\nPackage Type: ${packageType}`,
    };
  
    sendEmail(adminMailOptions);
   
    const userMailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'Travel Package Acknowledgement',
          text: `Dear ${fullName},\n\nThank you for contacting us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
    };
  
    sendEmail(userMailOptions);
  
    res.status(201).json({ message: 'Destination booked successfully!'} );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while booking the destination.' });
  }
});

app.post('/contact-us', async (req, res) => {
  try {
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
      from: process.env.EMAIL,
      to: process.env.EMAIL_2,
      replyTo: email,
      subject: 'New Contact Inquiry',
      text: mailText,
    };
  
    sendEmail(adminMailOptions);
  
    res.status(201).json({ message: 'Contact inquiry submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting contact inquiry.' });
  }
});

app.post('/subscribe', async (req, res) => {
  try {
    const { 'subscribe-email': email } = req.body;

    // Fill the form
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_2,
      replyTo: email,
      subject: 'New Newsletter Subscription Request',
      text: `Email Address: ${email}`,
    };
  
    sendEmail(adminMailOptions);
    
    res.status(201).json({ message: 'You have been subscribed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while subscribing to newsletter.' });
  }
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
