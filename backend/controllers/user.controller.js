import Profile from "../models/profile.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"

const register = async (req,res) => {
    try{
        const {name,email,password,userName} = req.body;
        if(!name || !email || !password || !userName ){
           return res.status(400).json( {message: "All fields are required"} )
        }

        const user = await User.findOne({
            email
        });

        if(user){
            return res.status(400).json({message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            userName
        });

        await newUser.save();

        const profile = new Profile({userId:newUser._id})
        await profile.save();

        return res.json({message:"User created"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}

export default register;