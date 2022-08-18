import { Router } from "express"
import provinceController from "../controllers/provinceController";




const router=Router();

router.get('/',provinceController.getProvinces);

export default router;