//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";


const { users,publicplaces } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class publicPlacesController {
    static async addPublicPlace(req, res) {
        try {
         
          if (req.publicplace) {
            return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message: "PublicPlace with this name already exist, please use another!",
            });
          }
          const { name,source,how_long,type,prov_name,dis_name, sec_name,cell_name,vil_name } = req.body;
            await publicplaces.create({
              id: uuidv4(),
              name,
              source,
              how_long,
              type,
              status:"Pending",
              prov_name,
              dis_name,
              sec_name,
              cell_name,
              vil_name,
             
            });
            return res.status(200).json({
              responseCode:200,
              status: 'Success',
              message: "PublicPlace created Successfuly",
            });
        } catch (error) {
          return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message,
          });
        }
    }
    static async getPublicPlaces(req, res) {
        try {
          const publicPlacesData = await publicplaces.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: publicPlacesData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }

      static async deletePublicPlace(req, res) {
        try {
          const modelId = req.params.id;
          const found = await publicplaces.findOne({
            where: { id: modelId },
          });
          if (found) {
            await publicplaces.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
             responseCode:200,
             status: 'Success',
             message: "PublicPlace was deleted successfull!",
            });
          }
          res.status(404).json({
            responseCode:404,
            status: 'Failed',
            message: "PublicPlace not found",
          });
        } catch (error) {
          res.status(500).json({ 
            responseCode:500,
            status: 'Failed',
            message: "server error"
         });
        }
      }
      
      static async getPublicPlaceById(req,res){
        try {
          const modelId=req.params.id;
          const PublicPlace=await publicplaces.findOne({
            where:{id:modelId}
          });
          if(PublicPlace){
            return res.status(200).json({
              status:200,
              data:PublicPlace
            });
          }
          return res.status(400).json({
              status:400,
              message:"PublicPlace Not Found"
            });
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
  
}

export default publicPlacesController;
