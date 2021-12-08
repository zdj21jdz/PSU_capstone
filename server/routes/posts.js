import express from 'express';
import { retrieveUserData, updatePortfolio, userInsights } from '../controllers/posts.js';

const router = express.Router();

// router.get('/', getPosts);
router.post('/', retrieveUserData);
router.post('/updatePortfolio', updatePortfolio)
router.post('/userInsight', userInsights)

export default router;