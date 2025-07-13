import mongoose from "mongoose";

export const Quiz=mongoose.model(
    'Quiz',
    mongoose.Schema(
        {
            title:{
                type:String,
                required:true
            },
            course_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"course",
                required:true
            },
            marks:{
                type:Number,
                required:true
            }
        },
        {timestamps:true}
    )
)