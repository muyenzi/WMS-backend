import { Router } from "express"
import organizationController from "../controllers/organizationController";
import CheckOrganization from "../middleware/CheckOrganization";



const router=Router();

router.post('/new-organization',CheckOrganization,organizationController.addOrganization);
router.get('/',organizationController.getOrganizations);
router.delete('/:id',organizationController.deleteOrganization);




export default router;