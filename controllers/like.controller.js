import Comment from "../models/comment.model.js"

const like = async (req, res) => {
    const commentId = req.params.commentId;
    await Comment.findByIdAndUpdate(
        commentId,
        { $inc: { likes: 1 } }
    );
    res.redirect(`${req.headers.referer}#comment`);
}


    export { like };