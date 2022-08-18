import { Router } from "express"
import schoolsController from "../controllers/schoolsController";
import CheckSchool from "../middleware/CheckSchool";



const router=Router();

router.post('/newschool',CheckSchool,schoolsController.addSchool);
router.get('/',schoolsController.getSchools);
router.delete('/:id',schoolsController.deleteSchool);




export default router;