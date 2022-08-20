import { Router } from "express"
import authController from "../controllers/authController";
import CheckUser from "../middleware/CheckUser";


const router=Router();

router.post('/signup',CheckUser,authController.signup);
router.post('/login',CheckUser,authController.login);
router.get("/users",authController.getAllUser);
router.post('/new-user',authController.AddnewUser);



export default router;