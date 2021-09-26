import express from 'express';

import { getPosts, retrieveUser } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', retrieveUser); // createPost

export default router;