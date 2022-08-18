//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";
import generateRandomPassword from "../helpers/passwordGenerator";

const { users,organizations } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class organizationController {
    static async addOrganization(req, res) {
        try {
         
          if (req.organization) {
            return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message: "Organization with this name already exist, please use anther!",
            });
          }
          const { name,description,category } = req.body;
            await organizations.create({
              id: uuidv4(),
              name,
              description,
              category
            });
            return res.status(200).json({
              responseCode:200,
              status: 'Success',
              message: "Organization created Successfuly",
            });
        } catch (error) {
          return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message,
          });
        }
    }
    static async getOrganizations(req, res) {
        try {
          const organizationData = await organizations.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: organizationData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }

      static async deleteOrganization(req, res) {
        try {
          const modelId = req.params.id;
          const found = await organizations.findOne({
            where: { id: modelId },
          });
          if (found) {
            await schools.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
             responseCode:200,
             status: 'Success',
             message: "Organization deleted successfull!",
            });
          }
          res.status(404).json({
            responseCode:404,
            status: 'Failed',
            message: "Organization not found",
          });
        } catch (error) {
          res.status(500).json({ 
            responseCode:500,
            status: 'Failed',
            message: "server error"
         });
        }
      }
      
      static async getOrganizationById(req,res){
        try {
          const organizationId=req.params.id;
          const organization=await organizations.findOne({
            where:{id:organizationId}
          });
          if(school){
            return res.status(200).json({
              status:200,
              data:organization
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

export default organizationController;
