import {Router} from 'express';
import {register, logIn, logOut, getMe} from "../controllers/auth.controller.js";
import {checkAuth} from "../middlewares/checkAuth.middleware.js";

const router = new Router;

//REGISTER
router.post('/register', register)

//LOG IN
router.post('/login', logIn)

//GET ME
router.get('/me', checkAuth, getMe)

//LOG OUT
router.get('/logout', logOut)


export default router;