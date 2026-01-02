
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';


export const userauth = async (req, res, next) => {

    const token = req.headers.authorization;

    if(!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({success: false, message: "No token, Auth denied"});
    }

    try {
        const tokengetting = token.split(' ')[1];

        const decodedToken = jwt.verify(tokengetting, process.env.TOKEN);
        req.userId = decodedToken.id;
        req.role = decodedToken.role;
        next();

    }catch (error) {
        res.status(401).json({success: false, message: "Token verification error"});
    }
}



export const roleRoute = (roles) =>async(req, res, next) => {
    try {
    const id = req.userId;
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({success: false, message: "User not found"});
    }

    const userRole = user.role;

    if(userRole === "user") {
        next();
    }else if (userRole === admin) {
        next();
    }else {
        return res.status(401).json({success: false, message: "You are not authorized to access this route"});
    }
}
    catch (error) {
        return res.status(500).json({success: false, message: "Server error"}); 
    }
    
    }