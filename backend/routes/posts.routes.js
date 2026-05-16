import { Router } from "express"
import activeCheck from "../controllers/post.controller.js";
const postRouter = Router();




postRouter.route('/').get(activeCheck);

export default postRoutes;