import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        index:true
    },
    name:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        unique:[true,"this email Id is already Registered"],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    referenceToken:{
        type:String,
    },
    role:{
        type:String,
        enum:['student','instructor','admin'],
        default:'student'
    }
},{timestamps:true})

// userSchema.pre("save",async (next)=>{
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,10);
//     }
//     next();
// })
userSchema.methods.isPasswordCorrect=async (password)=>{
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken=()=>{
    return jwt.sign(
        {
            id:this._id,
            username:this.username,
            email:this.email
        },
        process.env.AccessTokenSecret,
        {
            expiresIn:process.env.AccessTokenExpire
        }
    );
}
userSchema.methods.generateRefreshToken=()=>{
    return jwt.sign(
        {
            id:this._id,
        },
        process.env.ReferenceTokenSecret,
        {
            expiresIn:process.env.ReferenceTokenExpire
        }
    );
}

export const User=mongoose.model('User',userSchema);