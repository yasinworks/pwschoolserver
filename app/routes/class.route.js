import {Router} from 'express';
import {createClass, deleteClass, getAll, getAllSecured} from "../controllers/class.controller.js";
import {checkAuth} from "../middlewares/checkAuth.middleware.js";
import {checkRole} from "../middlewares/checkRole.middleware.js";
import {check} from "express-validator";

const router = new Router;

//CREATE CLASS
router.post('/create', checkAuth, checkRole(['TEACHER']), [
    check('name', 'Name must not be empty').notEmpty(),
    check('accessCode').isLength({min: 6}).optional()
], createClass);

//DELETE CLASS
router.delete('/delete', checkAuth, checkRole(['TEACHER']), deleteClass);

//GET ALL CLASSES
router.get('/', getAll);

//GET ALL WITHOUT LESSONS
router.get('/list', getAllSecured)

export default router;