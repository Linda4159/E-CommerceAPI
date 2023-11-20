import express,{Router} from "express"
import { createCategory, deleteCate, getAllCategory, singleCategory } from "../controller/categoryController"
import { verifyToken } from "../Middleware/Verify"

const router = express.Router()

router.route("/create-category/:userId").post(verifyToken,createCategory)
router.route("/all-categories").get(getAllCategory)
router.route("/singel-cate/:id").get(singleCategory)
router.route("/delete-category/:id").delete(deleteCate)


export default router