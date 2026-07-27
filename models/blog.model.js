import {Schema, model} from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})

const Blog = model('blog', blogSchema)

export default Blog;