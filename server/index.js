import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from'./routes/posts.js';
import postLogins from './routes/logins.js'
import postTests from './routes/tests.js';

const app = express();

// Config app to use cors
app.use(cors());
app.use(express.json());

// Middleware
app.use('/posts', postRoutes);
app.use('/logins', postLogins);
app.use('/tests',postTests);

// Set login creds
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

// Instantiate mongo and listen on PORT
mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
