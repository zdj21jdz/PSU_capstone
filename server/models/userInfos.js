import mongoose from 'mongoose';

const portfolioSchema = mongoose.Schema({
    stocks: Object
})

const userSchema = mongoose.Schema({
    username: String,
    portfolio: {
        type: portfolioSchema,
        required: true,
    }
});

const userInfos = mongoose.model('userInfos', userSchema)

export default userInfos;