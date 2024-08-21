import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
 