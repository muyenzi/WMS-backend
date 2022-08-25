import { Router } from "express";
import authRouters from "./auth.routers";
import schoolsRouters from "./schools.routers";
import provinceRouters from "./province.routers";
import districtRouters from "./district.routers";
import sectorRouters from "./sector.routers";
import cellRouters from "./cell.routers";
import villageRouters from "./village.routers";
import healthFacilityRouters from "./healthfacility.routers";
import publicPlacesRouters from "./publicPlace.routers";
import houseHoldsRouters from "./houseHold.routers";
import orgnizationRouters from "./organization.routers";
import messagesRouters from "./message.routers";
const router=Router();

router.use('/api/auth',authRouters);
router.use('/api/schools',schoolsRouters);
router.use('/api/provinces',provinceRouters);
router.use('/api/districts',districtRouters)
router.use('/api/sectors',sectorRouters);
router.use('/api/cells',cellRouters);
router.use('/api/villages',villageRouters);
router.use('/api/healthfacilities',healthFacilityRouters);
router.use('/api/publicplaces',publicPlacesRouters);
router.use('/api/households',houseHoldsRouters);
router.use('/api/organizations',orgnizationRouters);
router.use('/api/messages',messagesRouters);


export default router