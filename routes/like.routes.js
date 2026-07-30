import { Router } from 'express';
import { like } from '../controllers/like.controller.js';
const router = Router();

router.post("/:commentId/like", like)

export default router;