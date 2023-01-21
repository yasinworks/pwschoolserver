import {Router} from 'express';
import {register, logIn, getMe, getAll} from "../controllers/auth.controller.js";
import {checkAuth} from "../middlewares/checkAuth.middleware.js";
import {checkRole} from "../middlewares/checkRole.middleware.js";
import {check} from "express-validator";


const router = new Router;

//REGISTER
router.post('/register', [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password must be not shorter than 6').isLength({min: 6})
], register)

//LOG IN
router.post('/login', logIn)

//GET ME
router.get('/me', checkAuth, getMe)

//GET ALL USERS
router.get('/users', checkAuth, checkRole(['TEACHER']), getAll)


export default router;