import express from 'express';
import { check } from 'express-validator';
import { verifyEmail } from '../controllers/verifyEmail.js';

const router = express.Router();

// Santize submittedPass, submittedUsername
router.post('/',[
    // Ensure Email supplied is an actual email
    check('submittedEmail').isEmail().normalizeEmail(),
    // Make sure user/pass not empty
    check('submittedUsername').not().isEmpty().withMessage('Please provide a username'),
    check('submittedPass').not().isEmpty().withMessage('Please provide a password'),
    check('submittedUsername').trim().escape(),
    check('submittedPass').trim().escape()
    ], verifyEmail);

export default router;