//import Models from "../database/models";
import Models from "../database/models";

const { villages } = Models;
//const mailgun = require("mailgun-js");
class villageController {

    static async getVillageByCellId(req, res) {
        try {
            const cellId=req.params.id
          const Villages = await villages.findAll({
            where:{CellId:cellId}
          });
         // const  {...Districts,others}=Districts
        // const istricts={...createdAt, others}
          if(!villages){
            return res.status(400).json({
                responseCode:400,
                status: 'Failed',
                message:"Invalid Cell Id",
              });
          }
          return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: Villages,
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

export default villageController;
