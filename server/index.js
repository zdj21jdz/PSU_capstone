import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from'./routes/posts.js';

// Init App
const app = express();

// Middleware
app.use('/posts', postRoutes);

// Config app to use cors
app.use(cors());

// Set login creds
const CONNECTION_URL = process.env.PSUTRADE_MONGODB_APP
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindaAndModify', false); // doesnt work.. make sure we get no console warnings

// // Connect to DB
// await mongoose.connect('mongodb://localhost/my_database');
// const TestModel = mongoose.model('dev_database', myDataBase);

// // Example get data
// Router.get('/get-data', function (req, res, next) {
//     var resultsArray = [];
//     mongo.ConnectionCheckOutFailedEvent(url, function (err, db) {
//         AuthenticatorAssertionResponse.equal(null, err);
//         var cursor = db.collection('<add my data here').find();
//         cursor.forEach(function(doc, err) {
//             AuthenticatorAssertionRespons
//         }
//         });
//     })
// });