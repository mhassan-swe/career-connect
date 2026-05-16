import { mongoose } from "mongoose";

const EducationSchema = new.mongoose.Schema({
    school: {
        type:String,
        default:""
    },
    degree: {
        type:String,
        default:""
    },
    feildOfStudy: {
        type:String,
        default:""
    }
})