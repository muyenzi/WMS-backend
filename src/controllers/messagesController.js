//import Models from "../database/models";
import Models from "../database/models";
import { v4 as uuidv4 } from "uuid";
const { messages } = Models;
//const mailgun = require("mailgun-js");
class cellController {
    static async addMessage(req, res) {
        try {
            const { message,ref_id } = req.body;
         const found=await messages.findOne({
            where:{ref_id:ref_id}
         })
         if(found){
            return res.status(400).json({
                responseCode:400,
                status: 'Failed',
                message: "The Message already sent",
              }); 
         }
            await messages.create({
              id: uuidv4(),
             message,
             ref_id
             
            });
            return res.status(200).json({
              responseCode:200,
              status: 'Success',
              message: "Message Sent",
            });
        } catch (error) {
          return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message,
          });
        }
    }
    static async getMessage(req, res) {
        try {
            const refId=req.params.id
          const Cells = await messages.findOne({
            where:{ref_id:refId}
          });
         // const  {...Districts,others}=Districts
        // const istricts={...createdAt, others}
          if(!Cells){
            return res.status(400).json({
                responseCode:400,
                status: 'Failed',
                message:"Invalid  Id",
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
