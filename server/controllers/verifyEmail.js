
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail';

// Set up API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const verifyEmail = async (req,res) => {
  try {
    // Get username and password
    const uName = req.body.postData.submittedUsername;
    const uEmail = req.body.postData.submittedEmail;
    // const uPass = req.body.postData.submittedPass;

    // Test the log for the stuff
    console.log('Supplied Email is: ' + uEmail);
    console.log('Supplied uName is: ' + uName);
    
    // Build Email
    console.log('Building the email');
    const msg = {
      to: uEmail,
      from: 'zdj5007@psu.edu', // Verified sender
      subject: 'PSUTrade - Confirm New User',
      text: "New User Email",
      html: '<h1>New User Verification</h1><p>Please Click below link to verify your new account.</p>',
    }

    console.log('Email Built!');

    // Send email
    console.log('Email Sending...');
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        res.status(202).send('Email Sent!')
      })
      .catch((error) => {
        console.error(error)

        res.status(500).send('Server Error')
      })
    
    // TODO - Create users in DB
    // HOLD TODO

  } catch (error) {
    console.log('Error in controllers/verifyEmail')
    res.status(404).json({message: error.message });
  }
}