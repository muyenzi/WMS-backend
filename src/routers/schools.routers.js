import { Router } from "express"
import schoolsController from "../controllers/schoolsController";
import CheckSchool from "../middleware/CheckSchool";



const router=Router();

router.post('/new-chool',CheckSchool,schoolsController.addSchool);
router.get('/',schoolsController.getSchools);
router.get('/rejectedschools',schoolsController.getRejectedSchools);
router.get('/approvedschools',schoolsController.getApprovedSchools);
router.delete('/:id',schoolsController.deleteSchool);

router.put('/approve-school/:id',schoolsController.approveSchool);
router.put('/reject-school/:id',schoolsController.rejectSchool);

router.post("/schoolsbydistrictname",schoolsController.getSchoolByDistrictName)
router.post("/schoolsbysectorname",schoolsController.getSchoolBySectorName)
router.post("/schoolsbycellname",schoolsController.getSchoolByCellName)


router.get('/schoolsaprovedgroupedbysource',schoolsController.getAllSchoolGroupbysourceAndApproved);



export default router;