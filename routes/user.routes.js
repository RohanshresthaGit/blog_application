import { Router } from "express";
import {registerView, loginView, register, login, logout} from "../controllers/user.controller.js";
import checkToken from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.post('/register', register);
router.post('/login', login);
router.get('/logout',checkToken, logout);

export default router;