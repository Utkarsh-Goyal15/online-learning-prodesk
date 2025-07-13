import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { Enrollment } from '../models/enrollment.model.js';

export const registerUser= asyncHandler(async (req,res)=>{
    const {username,name,email,password,role}=req.body;
    
    if(username.trim()==='' || name.trim()==='' || email.trim()==='' || password.trim()==='' || role.trim()===''){
        throw new ApiError(401,'All fields are necessary');
    }
    const user=await User.findOne({ username,email });
    if(user){
        throw new ApiError('402','user with this credential already exist')
    }
    const newUser=await User.create({
        username:username,
        name:name,
        email:email,
        password:password,
        role:role
    });
    if(!newUser){
        throw new ApiError(500,'User not created')
    }
    res.status(200).json({
        message:"user is created",
        user:newUser
    })
})

export const login=asyncHandler(
    async (req,res)=>{
        const {username,password}=req.body;

        if(username.trim()==='' || password.trim()===''){
            throw new ApiError(401,'All fields are necessary');
        }

        const user=await User.findOne({username});
        
        if(!user){
            throw new ApiError(404,'User not registered');
        }

        if(!user.isPasswordCorrect(password)){
            throw new ApiError(402,'Wrong credentials');
        }

        const accesstoken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        const options={
            httpOnly:true,
            secure:true,
            SameSite:true,
            path:'/',
            expire:900
        }

        res
        .status(200)
        .cookie('accessToken',accesstoken,options)
        .cookie('refreshToken',refreshToken,options)
        .json(
            {
                message:'user logged in successfully'
            }
        )

    }
)

export const track=asyncHandler(
    async (req,res)=>{
        const {user_id}=req.body;
        if(user_id===''){
            throw new ApiError(401,'user id is necessary');
        }

        const enroll=await Enrollment.find({enrollment_id:user_id});
        if(!enroll){
            return res.status(404).json(
                {
                    message:'user not enrolled'
                }
            )
        }
        res.status(200).json(
            {
                track:enroll
            }
        )
    }
)