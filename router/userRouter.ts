import express,{Router} from "express"
import { createUser, getAllUsers, getSingleUser, logOut, loginUser, verifyUser } from "../controller/UserController"
import { verifyToken } from "../Middleware/Verify"


const router = express.Router()

router.route("/create-user").post(createUser)
router.route("/login-user").post(loginUser)
router.route("/single-profile/:id").get(getSingleUser)
router.route("/all-users").get(getAllUsers)
router.route("/logout-user").get(logOut)
router.route("/verify-account/:id").get(verifyUser)





export default router