import {Router} from "express";
import {checkAuth} from "../middlewares/checkAuth.middleware.js";
import {getMe, getAll} from "../controllers/user.controller.js";
import {checkRole} from "../middlewares/checkRole.middleware.js";

const router = new Router()

//GET ME
router.get('/me', checkAuth, getMe)

//GET ALL USERS
router.get('/', checkAuth, checkRole(['TEACHER']), getAll)

//ADD CLASS
// router.post('/me/add-class', checkAuth, (req, res) => {return res.json('1')})

export default router;