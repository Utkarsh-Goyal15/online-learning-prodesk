import { Router } from "express";
import { createQuiz,deleteQuiz,updateQuiz,createQuestions,attempt,updateQuestion } from "../controllers/quiz.controller.js";

const router=Router();

router.route('quiz/create').post(createQuiz);
router.route('quiz/delete').post(deleteQuiz);
router.route('quiz/update').post(updateQuiz);
router.route('question/create').post(createQuestions);
router.route('question/update').post(updateQuestion);
router.route('quiz/attempt').post(attempt);

export default router;