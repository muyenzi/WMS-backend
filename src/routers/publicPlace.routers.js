import { Router } from "express"
import publicPlacesController from "../controllers/publicPlacesController";
import CheckPublicPlace from "../middleware/CheckPublicPlace";




const router=Router();

router.post('/new-publicplace',CheckPublicPlace,publicPlacesController.addPublicPlace);
router.get('/',publicPlacesController.getPublicPlaces);
router.delete('/:id',publicPlacesController.deletePublicPlace);




export default router;