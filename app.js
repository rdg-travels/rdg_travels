require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

// Function to create transporter and verify connection configuration
function createTransporter() {
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

  return transporter;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(bodyParser.json());

// Enable CORS for the relevant route
app.use('/booking-flight', cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/studying-abroad', cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/book-hotel', cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/book-now', cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/contact-us', cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use('/subscribe', cors({
  origin: 'https://www.rdgtravels.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.post('/booking-flight', (req, res) => {
  const { tripType, flyingFrom, flyingTo, leavingOn, returningOn, fullName, email, phone, passengers } = req.body;

  // Check if trip is one way or return
  const isOneWay = tripType === 'oneWay';
  const returningDate = isOneWay ? 'N/A' : returningOn
  
  // Create transporter
  const transporter = createTransporter();

  // Email options for admin
  const mailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
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

  // Create transporter for sending acknowledgment email to the user
  const transporterToUser = createTransporter();
  const mailOptionsToUser = {
    from: process.env.EMAIL_2,
    to: email,
    subject: 'Flight Booking Acknowledgment',
    text: `Dear ${fullName},\n\nThank you for booking your flight with us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
  };

  // Send acknowledgment email to the user
  transporterToUser.sendMail(mailOptionsToUser, (error, info) => {
    if (error) {
      console.error(error);
      // Handle error in sending acknowledgment email to user
    } else {
      console.log('Acknowledgment email sent to user:', info.response);
      // Respond to the request indicating success
      res.send('Study abroad inquiry submitted successfully!');
    }
  });
});

app.post('/studying-abroad', (req, res) => {
  const { countryOfInterest, fieldOfStudy, intendedProgram, fullName, email, phoneNumber } = req.body;

  // Create transporter
  const transporter = createTransporter();

  // Fill the form
  const mailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Study Abroad Inquiry',
    text: `Country of Interest: ${countryOfInterest}\nField of Study: ${fieldOfStudy}\nIntended Program: ${intendedProgram}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Study abroad inquiry submitted successfully!');
    }
  });
  // Create transporter for sending acknowledgment email to the user
      const transporterToUser = createTransporter();
      const mailOptionsToUser = {
        from: process.env.EMAIL_2,
        to: email,
        subject: 'Study Abroad Inquiry Acknowledgement',
        text: `Dear ${fullName},\n\nThank you for interest in our services to Study Abroad. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
      };

      // Send acknowledgment email to the user
      transporterToUser.sendMail(mailOptionsToUser, (error, info) => {
        if (error) {
          console.error(error);
          // Handle error in sending acknowledgment email to user
        } else {
          console.log('Acknowledgment email sent to user:', info.response);
          // Respond to the request indicating success
          res.send('Study abroad inquiry submitted successfully!');
        }
      });
});

app.post('/book-hotel', (req, res) => {
  const { location, checkIn, checkOut, guests, fullName, email, phone } = req.body;

  // Create transporter
  const transporter = createTransporter();

  // Fill the form
  const mailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Hotel Booking',
    text: `Location: ${location}\nCheck In: ${checkIn}\nCheck Out: ${checkOut}\nNo of Guests: ${guests}\nFull Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phone}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Hotel booked successfully!');
    }
  });
  // Create transporter for sending acknowledgment email to the user
      const transporterToUser = createTransporter();
      const mailOptionsToUser = {
        from: process.env.EMAIL_2,
        to: email,
        subject: 'Hotel Booking Acknowledgement',
        text: `Dear ${fullName},\n\nThank you for booking your Hotel with us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
      };

      // Send acknowledgment email to the user
      transporterToUser.sendMail(mailOptionsToUser, (error, info) => {
        if (error) {
          console.error(error);
          // Handle error in sending acknowledgment email to user
        } else {
          console.log('Acknowledgment email sent to user:', info.response);
          // Respond to the request indicating success
          res.send('Hotel booked successfully!');
        }
      });
});

app.post('/book-now', (req, res) => {
  const { fullName, email, phoneNumber, packageType } = req.body;

  // Create transporter
  const transporter = createTransporter();

  // Fill the form
  const mailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Destination Booking',
    text: `Full Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}\nPackage Type: ${packageType}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Destination booked successfully!');
    }
  });
  // Create transporter for sending acknowledgment email to the user
      const transporterToUser = createTransporter();
      const mailOptionsToUser = {
        from: process.env.EMAIL_2,
        to: email,
        subject: 'Travel Package Acknowledgement',
        text: `Dear ${fullName},\n\nThank you for contacting us. We have received your request and will get back to you shortly.\n\nBest regards,\nRound D Globe Travels`,
      };

      // Send acknowledgment email to the user
      transporterToUser.sendMail(mailOptionsToUser, (error, info) => {
        if (error) {
          console.error(error);
          // Handle error in sending acknowledgment email to user
        } else {
          console.log('Acknowledgment email sent to user:', info.response);
          // Respond to the request indicating success
          res.send('Hotel booked successfully!');
        }
      });
});

app.post('/contact-us', (req, res) => {
  const { fullName, emailAddress, phoneNumber, purpose, message } = req.body;

  // Create transporter
  const transporter = createTransporter();
  // Fill the form
  let mailText = `Full Name: ${fullName}\nEmail Address: ${emailAddress}\nPhone Number: ${phoneNumber}\n`;
  if (purpose) {
    mailText += `Purpose of Contact: ${purpose}\n`;
  }
  if (message) {
    mailText += `Message: ${message}`;
  }

  const mailOptions = {
    from: emailAddress,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Contact Inquiry',
    text: mailText,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Contact inquiry submitted successfully!');
    }
  });
});

app.post('/subscribe', (req, res) => {
  const {  email } = req.body;

  // Create transporter
  const transporter = createTransporter();

  // Fill the form
  const mailOptions = {
    from: email,
    to: `${process.env.EMAIL_1}, ${process.env.EMAIL_2}`,
    subject: 'New Newsletter Subscription Request',
    text: `Email Address: ${email}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('You have been subscribed successfully!');
    }
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
