//import Models from "../database/models";
import Models from "../database/models";

const { cells } = Models;
//const mailgun = require("mailgun-js");
class cellController {

    static async getCellBySectorId(req, res) {
        try {
            const sectorId=req.params.id
          const Cells = await cells.findAll({
            where:{SectorId:sectorId}
          });
         // const  {...Districts,others}=Districts
        // const istricts={...createdAt, others}
          if(!Cells){
            return res.status(400).json({
                responseCode:400,
                status: 'Failed',
                message:"Invalid Sector Id",
              });
          }
          return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: Cells,
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

export default cellController;
