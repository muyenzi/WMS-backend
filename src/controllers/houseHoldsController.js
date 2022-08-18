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
         
          if (req.houseHold) {
            return res.status(400).json({
            responseCode:400,
            status: 'Failed',
            message: "HouseHold with this phone number already exist, please use anther!",
            });
          }
          const { source,frequency,how_long,phoneNumber,prov_name,dis_name, sec_name,cell_name,vil_name }= req.body;
            await households.create({
              id: uuidv4(),
              source,
              frequency,
              how_long,
              phoneNumber,
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
      
}

export default houseHoldsController;
