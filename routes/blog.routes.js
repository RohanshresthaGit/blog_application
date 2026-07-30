import {Router} from 'express';
import {addBlogView, addBlog, getBlogById, addComment} from '../controllers/blog.controller.js';
import upload from '../services/image.services.js';

const router = Router();
router.get('/add', addBlogView);
router.post('/add',upload.single("coverImage"), addBlog)
router.get('/:id', getBlogById);
router.post('/:blogId/comment', addComment);

export default router;