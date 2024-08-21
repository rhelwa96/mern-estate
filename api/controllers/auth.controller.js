import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export  const SignUp = async (req,res) => {
    try {
        const {email, username, password}=req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({email, username, password : hashedPassword});
        await newUser.save();
        return res.status(201).json({message: "User created successfully!"});
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}
 