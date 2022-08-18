//import Models from "../database/models";
import Models from "../database/models";

const { sectors } = Models;
//const mailgun = require("mailgun-js");
class sectorController {

    static async getSectorByDistrictId(req, res) {
        try {
            const districtId=req.params.id
          const Sectors = await sectors.findAll({
            where:{DistrictId:districtId}
          });
         // const  {...Districts,others}=Districts
        // const istricts={...createdAt, others}
          if(!Sectors){
            return res.status(400).json({
                responseCode:400,
                status: 'Failed',
                message:"Invalid District Id",
              });
          }
          return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: Sectors,
          });
          
        
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }

     
     
}

export default sectorController;
