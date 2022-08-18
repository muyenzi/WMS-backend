//import Models from "../database/models";
import Models from "../database/models";

const { districts } = Models;
//const mailgun = require("mailgun-js");
class districtController {

    static async getDistrictByProvId(req, res) {
        try {
            const provId=req.params.id
          const Districts = await districts.findAll({
            where:{ProvinceId:provId}
          });
         // const  {...Districts,others}=Districts
        // const {...createdAt, others}=Districts
       // const istricts={...createdAt, others}
          if(Districts){
            return res.status(200).json({
                responseCode:200,
                status: 'Success',
                data: Districts,
              });
          }
          return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message:"Invalid Province Id",
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

export default districtController;
