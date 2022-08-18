import { Router } from "express"
import districtController from "../controllers/districtController";

const router=Router();

router.get('/:id',districtController.getDistrictByProvId);

export default router;