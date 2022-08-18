//import Models from "../database/models";
import Models from "../database/models";

const { provinces } = Models;
//const mailgun = require("mailgun-js");
class provinceController {

    static async getProvinces(req, res) {
        try {
          const Provinces =await provinces.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: Provinces,
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

export default provinceController;
