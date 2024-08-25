import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export  const SignUp = async (req, res, next) => {
    try {
        const {email, username, password}=req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({email, username, password : hashedPassword});
        await newUser.save();
        return res.status(201).json({message: "User created successfully!"});
        
    } catch (error) {
       next(errorHandler(300,error.message));
    }

}

export  const SignIn = async (req, res, next) => {
    const {email, password}=req.body;
    try {
        const validUser=await User.findOne({ email });
        if(!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'wrong credentials'));
        const token = jwt.sign({id :validUser._id}, process.env.JWT_SECRET );
        const { password: hashedPassword, ...rest }= validUser._doc;
        const expireDate=new Date(Date.now()+3600000);
        return res
        .cookie('access_token',token, { httpOnly: true, expires: expireDate })
        .status(200)
        .json(rest);        
    } catch (error) {
       next(errorHandler(500,error.message));
    }

}