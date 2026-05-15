import { mongoose } from "mongoose"

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:true

    },
    userName: {
        type:String,
        required: true,
        unique:true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    updatedAt: {
        type:Date,
        default:Date.now
    },
    password: {
        type:String,
        require:true
    },
    profilePicture: {
        type:String,
        default:"default.jpg"
    },
    active: {
        type:Boolean,
        default:true
    },
    token: {
        type:String,
        default:""
    }
});

const User = mongoose.model('User',UserSchema);
export default User;