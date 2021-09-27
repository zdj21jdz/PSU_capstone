import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    portfolio: Object
});

const userInfos = mongoose.model('userInfos', userSchema)

export default userInfos;