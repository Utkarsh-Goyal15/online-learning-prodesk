import jwt from "jsonwebtoken";
import { ApiError } from '../utils/ApiError.js'; 

export default verify=(req,res,next)=>{
    const accessToken=req.cookie.accessToken;
    const refreshToken=req.cookie.refreshToken;
    if(trim(accessToken)===''|| trim(refreshToken)===''){
        throw new ApiError(401,'unauthorized access');
    }

    try {
        const decode=jwt.verify(accessToken,process.env.AccessTokenSecret);
        if(!decode){
            throw new ApiError(401,'unauthorized access');    
        }
        req.body.user_id=decode.id;
    } catch (error) {
        throw new ApiError(401,'unauthorized access');
    }
}