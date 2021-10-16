import express from 'express';
import { check } from 'express-validator';
import { validateUser } from '../controllers/logins.js';


const router = express.Router();

// Santize submittedPass, submittedUsername
router.post('/',[
    // Make sure user/pass not empty
    check('submittedUsername').not().isEmpty().withMessage('Please provide a username'),
    check('submittedPass').not().isEmpty().withMessage('Please provide a password'),
    check('submittedUsername').trim().escape(),
    check('submittedPass').trim().escape()
    ], validateUser);

export default router;