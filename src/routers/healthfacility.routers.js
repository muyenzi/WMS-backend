import { Router } from "express"
import healthfacilityController from "../controllers/healthFacilityController";
import CheckHealthFacility from "../middleware/CheckHeathFacility";

const router=Router();

router.post('/new-healthfacility',CheckHealthFacility,healthfacilityController.addHealthFacility);
router.get('/',healthfacilityController.getHealthFacilities);
router.delete('/:id',healthfacilityController.deleteHealthFacility);


router.put('/approvehealthfacility/:id',healthfacilityController.approveHealthFacility);
router.put('/rejecthealthfacility/:id',healthfacilityController.rejectHealthfacility)





export default router;