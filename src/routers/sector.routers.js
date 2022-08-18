import { Router } from "express"
import sectorController from "../controllers/sectorController";

const router=Router();

router.get('/:id',sectorController.getSectorByDistrictId);

export default router;