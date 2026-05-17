import { Router } from "express"
import  {register , login ,uploadProfilePicture} from "../controllers/user.controller.js"
import multer from "multer"


const userRouter = Router();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const upload = multer({ storage: storage })
userRouter.route('/upload_profile_picture').post(upload.single ('profile_picture'), uploadProfilePicture)


userRouter.route('/register').post(register);
userRouter.route('/login').post(login);

export default userRouter;