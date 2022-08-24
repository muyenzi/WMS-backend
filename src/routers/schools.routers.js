import { Router } from "express"
import schoolsController from "../controllers/schoolsController";
import CheckSchool from "../middleware/CheckSchool";



const router=Router();

router.post('/new-chool',CheckSchool,schoolsController.addSchool);
router.get('/',schoolsController.getSchools);
router.get('/rejectedschools',schoolsController.getRejectedSchools);
router.get('/approvedschools',schoolsController.getApprovedSchools);
router.delete('/:id',schoolsController.deleteSchool);




export default router;