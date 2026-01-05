import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createNewUser = async(req, res, next) => {
   const {email, password, name} = req.body;

   try {
    let user = await User.findOne({email: email});


    if(user) {
        res.status(400).json({success: false, message: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const passwordhash =  await bcrypt.hash(password, salt);



    user = new User ({
        email, password : passwordhash, name
    })

    await user.save();
    res.status(200).json({success: true, message: "User created successfully"});

   }catch (error) {
         res.status(500).json({success: false, message: "New User Creating Error"});
   }
    
}   


export const login = async(req, res, next) => {
    
    const {email} = req.body;

    try {
        let user = await User.findOne({email: email});

        if(!user) {
            res.status(404).json({success: false, message: "Email not found"});
        }

        const matchpassword = await bcrypt.compare(req.body.password, user.password);

        if(!matchpassword) {
            return res.status(400).json({success: false, message: "Wrong password"});
        }


        const createtoken = (user) => {
            return jwt.sign(
                {id: user._id, role: user.role},
                process.env.TOKEN,
                {
                    expiresIn : '1d'
                }
             )
        }


        const token = createtoken(user);

        const {password, role, ...rest} = user._doc;

        return res.status(200).json({ success:true, message: "Login done", token, data: {...rest},role})

 


    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Login Error"});
    }
}


export const updateUserProfile = async(req, res, next) => {
    const userId = req.params.id;

    try {
        const updateUser = await User.findByIdAndUpdate(userId, {$set: req.body}, {new: true});

        return res.status(200).json({success: true, message: "User profile updated!" })

    }catch (error) {
        return res.json({success: false, message: "Updatedprofile details Error"});
 
    }
}


export const deleteUserProfile = async(req, res, next) => {
    const userId =  req.params.id;

    try {
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true, message: "User profile deleted successfully"
        })
        


    }catch(error) {
        return res.status(500).json({
            success: false, message: "delete user profile error"
        })
    }

}


export const allusers = async(req, res, next) => {

    try {
        const users = await User.find({}).select("-password");
        return res.status(200).json({success: true, message: "All users found", data: users})


    }catch (error) {
        return res.status(500).json({success: false, message:" All users fetching error"});

    }
}


export const singleUser =  async(req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);

        const {password, ...rest} = user._doc;
        return res.status(200).json({success: true, message: "Single user found", data: {...rest}});


    }catch(error) {
        return res.status(500).json({success: false, message: "Single user fetching error"})
    }
}