import { Router } from "express"
import healthfacilityController from "../controllers/healthFacilityController";
import CheckHealthFacility from "../middleware/CheckHeathFacility";

const router=Router();

router.post('/new-healthfacility',CheckHealthFacility,healthfacilityController.addHealthFacility);
router.get('/',healthfacilityController.getHealthFacilities);
router.delete('/:id',healthfacilityController.deleteHealthFacility);


router.put('/approvehealthfacility/:id',healthfacilityController.approveHealthFacility);
router.put('/rejecthealthfacility/:id',healthfacilityController.rejectHealthfacility)

router.post('/healthfacilitybydistrictname',healthfacilityController.getHealthfacilityByDistrictName)
router.post('/healthfacilitybysectorname',healthfacilityController.getHealthfacilityBySectorName);
router.post('/healthfacilitybycellname',healthfacilityController.getHealthfacilityByCellName);





export default router;