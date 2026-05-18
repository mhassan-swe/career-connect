import { Router } from "express"
import  {register , login ,uploadProfilePicture, UpdateUserProfile, userAndProfile, updateProfileData ,getAllUsersProfile} from "../controllers/user.controller.js"
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

userRouter.route('/user_update').post(UpdateUserProfile);

userRouter.route('/get_user_and_profile').get(userAndProfile).post(userAndProfile)

userRouter.route('/update_profile_data').post(updateProfileData)

userRouter.route('/get_all_users').get(getAllUsersProfile)




export default userRouter;