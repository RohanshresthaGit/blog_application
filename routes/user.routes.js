import { Router } from "express";
import {registerView, loginView, register, login, logout} from "../controllers/user.controller.js";
const router = Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout)

export default router;