import { Router } from "express"
import houseHoldsController from "../controllers/houseHoldsController";
import CheckHousehold from "../middleware/CheckHousehold";




const router=Router();

router.post('/new-household',CheckHousehold,houseHoldsController.addHouseHold);
router.get('/',houseHoldsController.getHouseHolds);
router.delete('/:id',houseHoldsController.deleteHouseHold);




export default router;