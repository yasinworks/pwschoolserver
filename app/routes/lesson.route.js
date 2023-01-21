import {Router} from "express";
import {createLesson, deleteLesson, getAll, getLessonsByClass} from "../controllers/lesson.controller.js";
import {checkAuth} from "../middlewares/checkAuth.middleware.js";
import {checkRole} from "../middlewares/checkRole.middleware.js";
import {checkClass} from "../middlewares/checkClass.middleware.js";

const router = new Router();

//CREATE LESSON
router.post('/create', checkAuth, checkRole(['TEACHER']), createLesson);

//DELETE LESSON
router.delete('/delete', checkAuth, checkRole(['TEACHER']), deleteLesson)

//GET BY CLASS
// router.get('/class', checkAuth,
//     (req, res, next) => {
//         checkClass(req.query.ID)(req,res,next);
//     }, getLessonsByClass)

router.get('/class', checkAuth, (((req, res, next) => {checkClass(req.query.ID)(req,res,next);}) || checkRole(['TEACHER'])), getLessonsByClass)

//GET ALL
router.get('/', checkAuth, checkRole(['TEACHER']), getAll);

export default router;