import {Schema, model, trusted} from 'mongoose';

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Comment = model('Comment', commentSchema);

export default Comment;