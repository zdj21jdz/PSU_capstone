import express from 'express';

// import { getPosts, retrieveUserData } from '../controllers/posts.js';
import { retrieveUserData, updatePortfolio } from '../controllers/posts.js';

const router = express.Router();

// router.get('/', getPosts);
router.post('/', retrieveUserData);
router.post('/updatePortfolio', updatePortfolio)

export default router;