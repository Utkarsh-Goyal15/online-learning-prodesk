import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';
import { Quiz } from '../models/quiz.model.js';
import { Course } from '../models/course.model.js';
import { Question } from '../models/question.model.js';
import { Quiz_attempt } from '../models/quiz_attempt.model.js';
import { Student_answer } from '../models/student_answer.model.js';

export const createQuiz=asyncHandler(
    async (req,res)=>{
        const { title, course_id, marks}=req.body;

        if(title===''|| course_id===''|| marks===''){
            throw new ApiError(401,'All fields are required');
        }

        const course=await Course.find({_id:course_id});

        if(!course){
            throw new ApiError(404,"Course not found");
        }

        const quiz=await Quiz.create(
            {
                title,
                course_id,
                marks
            }
        )

        if(!quiz){
            throw new ApiError(500,"quiz not added");
        }
        res.status(200).json(
            {
                message:'quiz is created',
                quiz:quiz
            }
        )
    }
)

export const deleteQuiz=asyncHandler(
    async (req,res)=>{
        const {quiz_id}=req.body;

        if(quiz_id===''){
            throw new ApiError(401,"No quiz is provided to delete");
        }

        const deleteQuiz=await Quiz.delete({_id:quiz_id});
        if(!deleteQuiz){
            throw new ApiError(500,'quiz not deleted');
        }
        res.status(200).json(
            {
                message:"quiz is deleted successfully"
            }
        )
    }
)

export const updateQuiz=asyncHandler(
    async (req,res)=>{
        const { quiz_id,title, course_id, marks}=req.body;

        if(quiz_id==='' || title===''|| course_id===''|| marks===''){
            throw new ApiError(401,'All fields are required');
        }

        const quiz=await Quiz.find({_id:quiz_id});

        if(!quiz){
            throw new ApiError(404,"Quiz not found");
        }

        const updatedQuiz=await Quiz.update(
            {
                _id:quiz_id
            },
            {
                title,
                course_id,
                marks
            },
            {
                new:true
            }
        )

        if(!updatedQuiz){
            throw new ApiError(500,"quiz not added");
        }
        res.status(200).json(
            {
                message:'quiz is created',
                quiz:updatedQuiz
            }
        )        
    }
)

export const createQuestions=asyncHandler(
    async (req,res)=>{
        const {quiz_id,question,type,answer}=req.body;

        if(quiz_id==='' || question==='' || type===''|| answer===''){
            throw new ApiError(401,'all fields are required');
        }

        const quiz=await Quiz.find({_id:quiz_id});

        if(!quiz){
            throw new ApiError(404,"this quiz not exist");
        }

        if(type==='mcq'){
            const {options} = req.body;
            if(options.length===0){
                throw new ApiError(401,"options are necessary for mcq type");
            }
        }else{
            const options=[];
        }
        const createQuestion=await Question.create(
            {
                quiz_id,
                question,
                type,
                options,
                answer
            }
        )
        if(!createQuestion){
            throw new ApiError(500,"Question is not added");
        }

        res.status(200).json(
            {
                message:"question is added successfully",
                question:createQuestion
            }
        )
    }
)

export const updateQuestion=asyncHandler(
    async (req,res)=>{
        const {question_id,quiz_id,question,type,answer} = req.body;
        
        if(qustion_id==='' || quiz_id==='' || question==='' || type==='' || answer===''){
            throw new ApiError(401,"all fields are neccessary to update");
        }

        if(type==='mcq'){
            const {options} = req.body;
            if(options.length===0){
                throw new ApiError(401,"options are necessary for mcq type");
            }
        }else{
            const options=[];
        }

        const updatedQuestion=await Question.updateOne(
            {
                _id:question_id
            },
            {
                quiz_id,
                question,
                type,
                options,
                answer
            },
            {
                new:true
            }
        );

        if(!updatedQuestion){
            throw new ApiError(500,'question not updated');
        }

        res.status(200).json(
            {
                message:"question updated successfully",
                question:updatedQuestion
            }
        )
    }
)

export const attempt=asyncHandler(
    async (req,res)=>{
        const {user_id,quiz_id,score,question_id,answer}=req.body;

        if(user_id==='' || quiz_id==='' || score==='' || question_id.length===0 || answer.length===0 ){
            throw new ApiError(401,"all fields are required");
        }

        const attempt=await Quiz_attempt.create(
            {
                user_id,
                quiz_id,
                score
            }
        )

        if(!attempt){
            throw new ApiError(500,"server error, your attempt not recorded")
        }

        if(question_id.length===answer.length){
            for(i=0;i<question_id.length;i++){
                const studentAnswer=await Student_answer.create(
                    {
                        attempt_id:attempt._id,
                        question_id:question_id[i],
                        answer:answer[i]
                    }
                );
                if(!studentAnswer){
                    await Quiz_attempt.deleteOne(
                        {
                            _id:attempt._id
                        }
                    );
                    throw new ApiError(500,"your attempt not recorded");
                }
            }
        }

        res.status(200).json(
            {
                message:"attempt recorded successfully"
            }
        )
    }
)