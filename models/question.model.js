import mongoose from "mongoose";

export const Question=mongoose.model(
    'Question',
    mongoose.Schema(
        {
            quiz_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Quiz",
                required:true
            },
            question:{
                type:String,
                required:true
            },
            type:{
                type:String,
                enum:['mcq','very Short','short','long'],
                required:true
            },
            options:[{
                type:String,
                default:null
            }],
            answer:{
                type:String,
                required:true
            }
        }
    )
)