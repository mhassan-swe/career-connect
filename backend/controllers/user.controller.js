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
       return res.status(400).json({message:error.message})
    }
}


export const uploadProfilePicture = async(req,res) => {
    const {token} = req.body;
    try{

        const user = await User.findOne({token:token})

        if(!user){
          return  res.status(404).json({message:"user does not exist"})
        }

        user.profilePicture = req.file.filename;
        await user.save();
    }
    catch(error){
        return res.status(500).json({message:error.message})

    } 
}

export const UpdateUserProfile = async (req,res) => {
    try{
        const {token, ...newUserData} = req.body; //{...newUserData} we copy/put all the variable from body to newUserData except token (spreading)

        const user = await User.findOne({token:token})

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const {userName,email} = newUserData; // Destructuring to extract required properties from object
        const existingUser =await User.findOne({$or:[{userName},{email}]}); 

        if(existingUser){
            if(existingUser || String(existingUser._id) !== String(user._id)){
                 return res.status(404).json({message:"User already exist"})
            }
        }

        Object.assign(user,newUserData); // copy all properties from newUserData to user

        await user.save();

    }
    catch(error){
       return res.status(500).json({message:error.message})
    }
}

export const userAndProfile =async (req,res) => {
    try{
        const { token } = req.body;

        const user = await User.findOne({token});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const userProfile = await Profile.findOne({userId: user._id}) 
        .populate('userId',"name userName email profilePicture ") //populate is used to fetch related documents from another collection using reference (ObjectId). It can also be used to select specific fields.

        if(!userProfile){
            return res.status(404).json({message:"User profile not found"});
        }

        return res.json({profile:userProfile});
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }   
}


export const updateProfileData = async (req,res) => {
    try{
        const { token , ...newProfileData } = req.body;

        const user = await User.findOne({token});
        if(!user){
            return res.status(404).json({message:"user does not exist"});
        }

        const profileToUpdate = await Profile.findOne({userId:user._id});
        if(!profileToUpdate){
            return res.status(404).json({message:"user profile does not exist"});
        }

        Object.assign(profileToUpdate,newProfileData)

        await profileToUpdate.save();

        return res.json({message:"Profile updated", profile: profileToUpdate});

    }
    catch(error){
         return res.status(500).json({message:error.message})
    }
}


