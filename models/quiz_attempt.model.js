import mongoose from "mongoose";

export const Quiz_attempt=mongoose.model(
    'Quiz_attempt',
    mongoose.Schema(
        {
            user_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            quiz_id:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },
            score:{
                type:Number,
                required:true
            }
        },
        {
            timestamps:true
        }
    )
)