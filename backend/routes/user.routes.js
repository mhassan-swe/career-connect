import { Router } from "express"
import register from "../controllers/user.controller.js"


const userRoutes = Router();




userRoutes.route('/register').post(register);

export default userRoutes;