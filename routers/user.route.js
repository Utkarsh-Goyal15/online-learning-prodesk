import { Router } from "express";
import { registerUser,login,track } from "../controllers/user.controller.js";
import { enroll } from "../controllers/enroll.controller.js";
const router=Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/enroll').post(enroll);
router.route('/track').post(track);

export default router;