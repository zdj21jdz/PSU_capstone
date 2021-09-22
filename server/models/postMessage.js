import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username: String,
    pass: String
});

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;