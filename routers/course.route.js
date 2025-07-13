import { Router } from "express";
import { addCourse,updateCourse,deleteCourse } from "../controllers/course.controller.js";

const router=Router();

router.route('/add').post(addCourse);
router.route('/update').post(updateCourse);
router.route('/delete').post(deleteCourse);

export default router;