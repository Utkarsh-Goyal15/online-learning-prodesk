import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js"
import { Enrollment } from "../models/enrollment.model.js";

export const enroll =asyncHandler(
    async (req,res)=>{
        const {course_id,user_id}=req.body;

        if(course_id.trim()==='' || user_id.trim()===''){
            throw new ApiError(401,'All credentials are required');
        }
        const enrolled=await Enrollment.findone(
            {
                course_id,
                enrollment_id:user_id
            }
        );

        if(enrolled){
            return res.status(409).json(
                {
                    message:'user alrady enrolled'
                }
            )
        }

        const enroll=await Enrollment.create(
            {
                course_id,
                enrollment_id:user_id
            }
        )
        if(!enroll){
            throw new ApiError(500,"server error user not enroll");
        }
        return res.status(200).json(
            {
                message:"user enrolled"
            }
        )

    }
)