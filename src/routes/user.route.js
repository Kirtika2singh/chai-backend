import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, //avatar
    {
        name: "coverImage",
        maxCount: 1
    } //coverimage
]),
registerUser);
// router.route("/login").post(registerUser);

export default router;