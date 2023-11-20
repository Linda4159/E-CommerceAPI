import express, {Router} from "express"
import { editImage, updateProfile } from "../controller/profileController"
import {upload} from "../utils/multer"

const router = express.Router()


router.route("/edit/pro/:proId").put(updateProfile)
router.route("/edit/pro-Img/:proId").put(upload,editImage)


export default router