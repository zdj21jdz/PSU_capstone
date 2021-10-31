// Import libraries needed
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import expressBouncer from 'express-bouncer';

// Import Custom Functions
import postRoutes from'./routes/posts.js';
import postLogins from './routes/logins.js'
import postTests from './routes/tests.js';

const app = express();
const __dirname = path.resolve();

// Config app to use cors
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Set up our bouncer - (min. wait time 1 minute, max wait time 15 minutes)
const bouncer = expressBouncer(60000, 900000); // in ms

// Custom blocked error // throws error in 3rd invalid attempt
bouncer.blocked = function (req, res, next, remaining)
{
  res.status(429).send("Slow down - Too many requests have been made! " +
        "Please wait " + remaining / 1000 + " seconds");
};

// Middleware
app.get('/', bouncer.block, function (req, res) {
  bouncer.reset(req);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/posts', postRoutes);
app.use('/logins', bouncer.block, postLogins);
app.use('/tests', bouncer.block, postTests);

// Set login creds
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

// // For testing without Mongo instance
// app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

// Instantiate mongo and listen on PORT
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
