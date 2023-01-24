import {Router} from 'express';
import {register, logIn} from "../controllers/auth.controller.js";
import {check} from "express-validator";


const router = new Router;

//REGISTER
router.post('/register', [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password must be not shorter than 6').isLength({min: 6})
], register)

//LOG IN
router.post('/login', logIn)


export default router;