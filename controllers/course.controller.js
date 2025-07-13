import asyncHandler from 'express-async-handler';
import { Course } from '../models/course.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js'

export const addCourse=asyncHandler(
    async (req,res)=>{
        const {title,description,instructor_id}=req.body;

        if(title.trim()===''|| description.trim()===''||instructor_id.trim()===''){
            throw new ApiError(401,'All fields are required');
        }

        const instructor=await User.findOne({_id:instructor_id});

        if(!instructor){
            throw new ApiError(404,'instructor not found');
        }

        const course=await Course.create(
            {
                title,
                description,
                instructor_id
            }
        );
        if(!course){
            throw new ApiError(500,'course not added');
        }
        res.status(200).json(
            {
                message:"course added successfully"
            }
        )
    }
)

export const updateCourse=asyncHandler(
    async (req,res)=>{
        const {course_id,title,description,instructor_id}=req.body;

        if(course_id.trim()===''||title.trim()===''||description.trim()===''||instructor_id.trim()===''){
            throw new ApiError(401,'All fields are required'); 
        }

        const course= await Course.findOne({_id:course_id});

        if(!course){
            throw new ApiError(404,'course not exist');
        }

        const instructor= await User.findOne({_id:instructor_id});

        if(!instructor){
            throw new ApiError(404,'instructor not found');
        }

        const updatedCourse= await Course.updateOne(
            {
                _id:course_id
            },
            {
                title,
                description,
                instructor_id
            },
            {
                new:true
            }
        )
        
        if(!updatedCourse){
            throw new ApiError(500,'Course not updated');
        }

        res.status(200).json(
            {
                message:"course updated successfully"
            }
        )
    }
)

export const deleteCourse=asyncHandler(
    async (req,res)=>{
        let {course_id}=req.body;

        if(course_id.trim()===''){
            throw new ApiError(401,'All fields are required');
        }

        const course=Course.delete(
            {
                _id:course_id
            }
        );

        if(!course){
            throw new ApiError(500,"course not deleted");
        }

        res.status(200).json(
            {
                message:'course deleted successfully'
            }
        );
    }
)