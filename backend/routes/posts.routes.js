import { Router } from "express"
import activeCheck from "../controllers/post.controller.js";
const postRoutes = Router();




postRoutes.route('/').get(activeCheck);

export default postRoutes;