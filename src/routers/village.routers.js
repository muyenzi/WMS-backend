import { Router } from "express"
import villageController from "../controllers/villageController";

const router=Router();

router.get('/:id',villageController.getVillageByCellId);

export default router;