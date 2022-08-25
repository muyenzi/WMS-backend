import { Router } from "express"
import messagesController from "../controllers/messagesController";

const router=Router();
router.post('/',messagesController.addMessage)
router.get('/:id',messagesController.getMessage);

export default router;