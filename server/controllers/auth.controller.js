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
            res.status(400).json({success: false, message: "Wrong password"});
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

        res.status(200).json({ success:true, message: "Login done", token, data: {...rest},role})

 


    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Login Error"});
    }
}