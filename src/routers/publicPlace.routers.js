import { Router } from "express"
import publicPlacesController from "../controllers/publicPlacesController";
import CheckPublicPlace from "../middleware/CheckPublicPlace";




const router=Router();

router.post('/new-publicplace',CheckPublicPlace,publicPlacesController.addPublicPlace);
router.get('/',publicPlacesController.getPublicPlaces);
router.delete('/:id',publicPlacesController.deletePublicPlace);

router.post('/publicplacebydistrictname',publicPlacesController.getPublicPlaceByDistrictName,)
router.post('/publicplacebysectorname',publicPlacesController.getPublicPlaceBySectorName);
router.post('/publicplacebycellname',publicPlacesController.getPublicPlaceByCellName);



export default router;