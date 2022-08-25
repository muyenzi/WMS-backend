//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";
import generateRandomPassword from "../helpers/passwordGenerator";
import { Sequelize } from "sequelize";
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
          const { name,source,frequency,how_long,level,prov_name,dis_name } = req.body;
            await schools.create({
              id: uuidv4(),
              name,
              source,
              frequency,
              how_long,
              level,
              status:"Pending",
              prov_name,
              dis_name,
              sec_name:"1",
              cell_name:"1",
              vil_name:"1"
             
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
      static async getRejectedSchools(req, res) {
        try {
          const schoolsData = await schools.findAll({
          where:{status:"Rejected"}
          });
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
      static async getApprovedSchools(req, res) {
        try {
          const schoolsData = await schools.findAll({
          where:{status:"Approved"}
          });
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

      static async approveSchool(req,res){
        try {
          const SchoolId=req.params.id;
          const school=await schools.findOne({
            where:{id:SchoolId}
          });
          if(!school){
            return res.status(400).json({
              status:400,
              message:"Invalid School Id"
            });
          }
          else{
            const approvedSchool = await schools.update(
              {
                status: "Approved"
               
              },
              { where: { id: SchoolId }, returning: true }
            );
            return res.status(200).json({
              status: 200,
              message: "Approved",
              data: approvedSchool,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
      static async rejectSchool(req,res){
        try {
          const SchoolId=req.params.id;
          const school=await schools.findOne({
            where:{id:SchoolId}
          });
          if(!school){
            return res.status(400).json({
              status:400,
              message:"Invalid School Id"
            });
          }
          else{
            const rejectedSchool = await schools.update(
              {
                status: "Rejected"
               
              },
              { where: { id: SchoolId }, returning: true }
            );
            return res.status(200).json({
              status: 200,
              message: "Rejected",
              data: rejectedSchool,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }

      static async getAllSchoolGroupbysourceAndApproved(req,res){
        try {
          const Results = await schools.findAll(
           
            {
            attributes: [
              // [Sequelize.fn("sum", Sequelize.col("marks")), "total"],
              [Sequelize.fn("COUNT", Sequelize.col("source")), "source"],
            ],
    
            raw: true,
          //  order: Sequelize.literal("total DESC"),
            group: ["source"]
          },
          // {where:{status:"Rejected"}},
          
          );
          if (Results) {
          
            return res.status(200).json({
              status: 200,
              message: "Success",
              data: Results,
            });
          }
          return res.status(404).json({
            status: 404,
            message: "No Data Found",
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
