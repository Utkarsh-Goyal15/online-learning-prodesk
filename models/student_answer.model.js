import mongoose from "mongoose";

export const Student_answer=mongoose.model(
    "Student_answer",
    mongoose.Schema(
        {
            attempt_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Quiz_attempt",
                required:true
            },
            question_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Question",
                required:true
            },
            answer:{
                type:String,
                required:true
            }
        }
    )
)