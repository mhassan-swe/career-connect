import { Router } from "express"
import {register,login} from "../controllers/user.controller.js"


const userRoutes = Router();




userRoutes.route('/register').post(register);
userRoutes.route('/login').post(login);

export default userRoutes;