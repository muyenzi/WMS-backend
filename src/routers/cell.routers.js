import { Router } from "express"
import cellController from "../controllers/cellController";

const router=Router();

router.get('/:id',cellController.getCellBySectorId);

export default router;