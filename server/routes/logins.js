import express from 'express';
import { validateUser } from '../controllers/logins.js';

const router = express.Router();

// router.post('/', validateUser);
router.post('/', validateUser);

export default router;