import Blog from '../models/blog.model.js'
import Comment from '../models/comment.model.js'
import User from '../models/user.model.js'

const addBlogView = (req, res) => {
    return res.render('AddBlog', {
        user: req.user
    });
}

const addBlog = (req, res) => {
    const {title, content} = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newBlog = new Blog({
        title,
        content,
        createdBy: req.user._id,
        coverImage: `/images/${coverImage}`
    });
    newBlog.save();
    return res.redirect(`/blog/${newBlog._id}`);
}

const getBlogById =async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: blog._id }).populate("commentedBy");
  return res.render('blog',{
    user: req.user,
    blog: blog,
    comments: comments
  });
};

const addComment = async (req, res) => {
    const {comment} = req.body;
    const blogId = req.params.blogId;
    const userId = req.user._id;

    const newComment = new Comment({
        comment,
        blogId,
        commentedBy: userId
    });
    await newComment.save();
    return res.redirect(`/blog/${blogId}`);
};

export {addBlogView, addBlog, getBlogById, addComment}