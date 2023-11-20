import express from "express"
import { ViewAllProduct, ViewSingleProduct, createProduct } from "../controller/productController"
import {uploads} from "../utils/multer"
import { verifyToken } from "../Middleware/Verify"

const router =express.Router()

router.route("/create-product/:userId/:catId").post(verifyToken,uploads,createProduct)
router.route("/singleProduct/:id").get(ViewSingleProduct)
router.route("/all-Products").get(ViewAllProduct)


export default router