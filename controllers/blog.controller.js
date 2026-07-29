import Blog from '../models/blog.model.js'

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
  const blog = await Blog.findById(req.params.id);
  return res.render('blog',{
    user: req.user,
    blog: blog
  });
};

export {addBlogView, addBlog, getBlogById}