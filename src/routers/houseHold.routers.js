import { Router } from "express"
import houseHoldsController from "../controllers/houseHoldsController";
import CheckHousehold from "../middleware/CheckHousehold";




const router=Router();

router.post('/new-household',CheckHousehold,houseHoldsController.addHouseHold);
router.get('/',houseHoldsController.getHouseHolds);
router.delete('/:id',houseHoldsController.deleteHouseHold);


router.post('/householdbydistrictname',houseHoldsController.getHouseholdByDistrictName)
router.post('/householdbysectorname',houseHoldsController.getHouseholdBySectorName);
router.post('/householdbycellname',houseHoldsController.getHouseholdByCellName);

router.put('/approve-household/:id',houseHoldsController.approveHouseHold);
router.put('/reject-household/:id',houseHoldsController.rejectHouseHold);





export default router;