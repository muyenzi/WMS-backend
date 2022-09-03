//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";
import generateRandomPassword from "../helpers/passwordGenerator";

const { users,households } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class houseHoldsController {
    static async addHouseHold(req, res) {
        try {
         
          if (req.household) {
            return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message: "HouseHold with this phone number already exist, please use anther!",
            });
          }
          const { source,frequency,how_long,phoneNumber,prov_name,dis_name,sec_name,cell_name,vil_name }= req.body;
            await households.create({
              id: uuidv4(),
              source,
              frequency,
              how_long,
              phoneNumber,
              status:"Pending",
              prov_name,
              dis_name,
              sec_name,
              cell_name,
              vil_name
            });
            return res.status(200).json({
              responseCode:200,
              status: 'Success',
              message: "HouseHold created Successfuly",
            });
        } catch (error) {
          return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message,
          });
        }
    }
    static async getHouseHolds(req, res) {
        try {
          const houseHoldsData = await households.findAll();
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: houseHoldsData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }
      static async getHouseholdByDistrictName(req, res) {
        try {
          const {districtName}=req.body
          const HouseholdData = await households.findAll({
          where:{dis_name:districtName}
          });
      
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: HouseholdData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }
      static async getHouseholdBySectorName(req, res) {
        try {
          const {sectorName}=req.body
          const HouseholdData = await households.findAll({
          where:{sec_name:sectorName}
          });
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: HouseholdData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }
      static async getHouseholdByCellName(req, res) {
        try {
          const {cellName}=req.body
          const HouseholdData = await households.findAll({
          where:{cell_name:cellName}
          });
         return res.status(200).json({
            responseCode:200,
            status: 'Success',
            data: HouseholdData,
          });
        } catch (error) {
         return res.status(500).json({
            responseCode:500,
            status: 'Failed',
            message: error.message 
            });
        }
      }
      static async deleteHouseHold(req, res) {
        try {
          const modelId = req.params.id;
          const found = await households.findOne({
            where: { id: modelId },
          });
          if (found) {
            await households.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
             responseCode:200,
             status: 'Success',
             message: "Household was deleted successfull!",
            });
          }
          res.status(404).json({
            responseCode:404,
            status: 'Failed',
            message: "Household not found",
          });
        } catch (error) {
          res.status(500).json({ 
            responseCode:500,
            status: 'Failed',
            message: "server error"
         });
        }
      }

      static async approveHouseHold(req,res){
        try {
          const houseHoldId=req.params.id;
          const houseHold=await households.findOne({
            where:{id:houseHoldId}
          });
          if(!houseHold){
            return res.status(400).json({
              status:400,
              message:"Invalid HouseHold Id"
            });
          }
          else{
            const approvedHouseHold = await households.update(
              {
                status: "Approved"
               
              },
              { where: { id: houseHoldId }, returning: true }
            );
            return res.status(200).json({
              status: 200,
              message: "Approved",
              data: approvedHouseHold,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
      static async rejectHouseHold(req,res){
        try {
          const houseHoldId=req.params.id;
          const houseHold=await households.findOne({
            where:{id:houseHoldId}
          });
          if(!houseHold){
            return res.status(400).json({
              status:400,
              message:"Invalid houseHold Id"
            });
          }
          else{
            const rejectedhouseHold= await households.update(
              {
                status: "Rejected"
               
              },
              { where: { id: houseHoldId }, returning: true }
            );
            return res.status(200).json({
              status: 200,
              message: "Rejected",
              data: rejectedhouseHold,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.message,
          });
        }
      }
      
}

export default houseHoldsController;
