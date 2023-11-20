import express,{Router} from "express"
import { checkOut } from "../controller/orderController"

const router = express.Router()
router.route("/order-checkout/:userId").post(checkOut)

export default router