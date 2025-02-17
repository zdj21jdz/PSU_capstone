import mongoose from 'mongoose';

const loginSchema = mongoose.Schema({
    username: String,
    pass: String,
    isValidated: Boolean,
    verificationToken: String
});

const dev_databases = mongoose.model('dev_databases', loginSchema)

export default dev_databases;