
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail';
import { validate } from 'email-validator';
import mongoose from 'mongoose';
import JwtGen from '../utils/JwtGen.js'

import dev_databases from "../models/loginUser.js";

// Set up API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const verifyEmail = async (req,res) => {
  try {
    // Get username and password
    const uName = req.body.postData.submittedUsername;
    const uEmail = req.body.postData.submittedEmail;
    const uPass = req.body.postData.submittedPass;

    // Validate the email
    if (!validate(uEmail)) {
      throw {message: 'Invalid Email!'}
    }

    // Test the log for the stuff
    console.log('Supplied Email is: ' + uEmail);
    console.log('Supplied uName is: ' + uName);

    // Create users in DB
    console.log('creating user')
    // Set token for verification purposes
    const verificationToken = JwtGen(uName);

    await dev_databases.create({
      username: uName, 
      pass: uPass, 
      isValidated: true
      // verificationToken: verificationToken // to add after routing set up
    });
    
    // Build Email
    console.log('Building the email');
    const msg = {
      to: uEmail,
      from: 'zdj5007@psu.edu', // Verified sender
      subject: 'PSUTrade - Confirm New User',
      text: "New User Email",
      html: '<h1>New User Verification</h1><p>Congratulations, your user was set up!</p>',
    }

    // Send email
    console.log('Email Sending...');
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.status(202).send('Email Sent! User is created. Currently working on validation')
      })
      .catch((error) => {
        console.error(error)
        res.sendStatus(500);
      })

  } catch (error) {
    if (error.message === "Invalid Email!") {
      res.sendStatus(400);
    } else {
      console.log('Error in controllers/verifyEmail')
      console.log(error.message)
      res.sendStatus(500);
    }
  }
}