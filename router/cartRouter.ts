import express,{Router} from "express"
import { addToCart, removeCartItem } from "../controller/cartController"

const router = express.Router()

router.route("/cart-items/:userId/:prodId").post(addToCart)
router.route("/remove-item/:userId").delete(removeCartItem)

export default router