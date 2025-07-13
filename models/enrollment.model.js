import mongoose from "mongoose";

export const Enrollment = mongoose.model(
    "Enrollment",
    mongoose.Schema(
        {
            enrollment_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            course_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course",
                required:true
            },
            completed:{
                type:Number,
                min:0,
                max:100,
                default:0
            },
            enrolled_at:{
                type:Date,
                default:Date.now,
                required:true
            }
        }
    )
);