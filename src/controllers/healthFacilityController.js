//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";


const { users,healthfacilities } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class healthFacilityController {
    static async addHealthFacility(req, res) {
        try {
         
          if (req.healthFacility) {
            return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message: "Health Facility with this name already exist, please use anther!",
            });
          }
          const { name,source,frequency,how_long,type,prov_name,dis_name, sec_name,cell_name,vil_name } = req.body;
            await healthfacilities.create({
              id: uuidv4(),
              name,
              source,
              frequency,
              how_long,
              type,
              prov_name,
              dis_name,
              sec_name,
              cell_name,
              vil_name,
              cat_id:null
            });
            return res.status(200).json({
              responseCode:200,
              status: 'Success',
              message: "HealthFacility created Successfuly",
            });
        } catch (error) {
          return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message,
          });
        }
    }
    static async getHealthFacilities(req, res) {
        try {
          const healthFacilityData = await healthfacilities.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: healthFacilityData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }

      static async deleteHealthFacility(req, res) {
        try {
          const modelId = req.params.id;
          const found = await healthfacilities.findOne({
            where: { id: modelId },
          });
          if (found) {
            await healthfacilities.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
             responseCode:200,
             status: 'Success',
             message: "Health Facility was deleted successfull!",
            });
          }
          res.status(404).json({
            responseCode:404,
            status: 'Failed',
            message: "Health Facility not found",
          });
        } catch (error) {
          res.status(500).json({ 
            responseCode:500,
            status: 'Failed',
            message: "server error"
         });
        }
      }
      
      static async getHealthfacilityById(req,res){
        try {
          const modelId=req.params.id;
          const healthFacility=await healthfacilities.findOne({
            where:{id:modelId}
          });
          if(school){
            return res.status(200).json({
              status:200,
              data:healthFacility
            });
          }
          return res.status(400).json({
              status:400,
              message:"HealthFacility Not Found"
            });
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
  
}

export default healthFacilityController;