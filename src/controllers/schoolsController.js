//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";
import generateRandomPassword from "../helpers/passwordGenerator";

const { users,schools } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class schoolsController {
    static async addSchool(req, res) {
        try {
         
          if (req.school) {
            return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message: "School with this name already exist, please use anther!",
            });
          }
          const { name,source,frequency,how_long,level,prov_name,dis_name, sec_name,cell_name,vil_name } = req.body;
            await schools.create({
              id: uuidv4(),
              name,
              source,
              frequency,
              how_long,
              level,
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
              message: "School created Successfuly",
            });
        } catch (error) {
          return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message,
          });
        }
    }
    static async getSchools(req, res) {
        try {
          const schoolsData = await schools.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: schoolsData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }

      static async deleteSchool(req, res) {
        try {
          const modelId = req.params.id;
          const found = await schools.findOne({
            where: { id: modelId },
          });
          if (found) {
            await schools.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
             responseCode:200,
             status: 'Success',
             message: "School was deleted successfull!",
            });
          }
          res.status(404).json({
            responseCode:404,
            status: 'Failed',
            message: "School not found",
          });
        } catch (error) {
          res.status(500).json({ 
            responseCode:500,
            status: 'Failed',
            message: "server error"
         });
        }
      }
      
      static async getSchoolById(req,res){
        try {
          const SchoolId=req.params.id;
          const school=await schools.findOne({
            where:{id:SchoolId}
          });
          if(school){
            return res.status(200).json({
              status:200,
              data:school
            });
          }
          return res.status(400).json({
              status:400,
              message:"School Not Found"
            });
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
  
}

export default schoolsController;
