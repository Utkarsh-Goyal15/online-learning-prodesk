import mongoose from "mongoose";

export const Course=
mongoose.model(
    'Course',
    mongoose.Schema(
        {
            title:{
                type:String,
                unique:true,
                required:true
            },
            description:{
                type:String,
                lowercase:true,
                required:true
            },
            instructor_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            }
        },
        {timestamps:true}
    )
);