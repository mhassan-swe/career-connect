import Profile from "../models/profile.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import crypto from "crypto"

export const register = async (req,res) => {
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




export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || ! password){
            return res.status(400).json({message:"All fields are required"});

        }
        
        const user = await User.findOne({
            email
        });

        if(!user){
            return res.status(404).json({message:"user do not exit"});
        }

        const isMatch = await bcrypt.compare( password, user.password );
        if(!isMatch){
            return res.status(400).json({message:"invalid Credentials"});
        }

        const token = await crypto.randomBytes(32).toString("hex");

        await User.findByIdAndUpdate ({_id:user.id} ,{token})
        return res.json({token})
        
    } 

    catch(error){
        res.status(400).json({message:error.message})
    }
}


export const uploadProfilePicture = async(req,res) => {
    const {token} = req.body;
    try{

        const user = await User.findOne({token:token})

        if(!user){
            res.status(404).json({message:"user does not exist"})
        }

        user.profilePicture = req.file.filename;
        await user.save();
    }
    catch(error){
        res.status(500).json({message:message.error})

    } 
}

