import express from 'express';

import { getPosts, retrieveUser } from '../controllers/posts.js';

const router = express.Router();
// // Router template 
// router.get('/', (req, res) => {
//
// });

router.get('/', getPosts);
router.post('/', retrieveUser); // createPost

export default router;