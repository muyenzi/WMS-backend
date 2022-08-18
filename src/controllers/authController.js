//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";
import generateRandomPassword from "../helpers/passwordGenerator";

const { users } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class authController {
  static async signup(req, res) {
    try {
        if (req.user) {
          return res.status(400).json({
            status: 400,
            message: "User with email already exist please use onther!",
          });
        }
        const { fullname, email, role } = req.body;
        const password = generateRandomPassword();
        console.log("password:",password)
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
         const data= await users.create({
            id: uuidv4(),
            fullname,
            email,
            role,
            isActive: false,
            password:hashedPassword,
            organizationId: null,
          });
       
        return res.status(200).json({
          status: 200,
          message: "User have been created Successfully!",
          data:data
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
      
}
static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!req.user){
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
      const dbEmail = req.user.email;
      const dbPasword = req.user.password;
     // const confirmed = req.user.isActive;
      const decreptedPassword = await bcrypt.compare(password, dbPasword);
      console.log(decreptedPassword);
        if (dbEmail === email) {
          if (decreptedPassword) {
           // const userSchooldbId = req.user.schoolId;
           // const userDistrictdbId = req.user.districtId;
            const dbRole = req.user.role;
            const token = await encode({
              email,
              dbRole,
            });
            const decodedToken = await decode(token);
            // const userSchoolId = decodedToken.userSchooldbId;
            // const userDistrictId = decodedToken.userDistrictdbId;
            const Email = decodedToken.email;
            const role = decodedToken.dbRole;
            return res.status(200).json({
              status: 200,
              message: "User logged with Token",
              data: {
                user: Email,
                role: role,
               // organizationId: organizationId,
                token,
              },
            });
          }
        }
        return res.status(400).json({
          status: 400,
          message: "Password is not correct",
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error" + error.message,
      });
    }
  }
  static async getAllUser(req, res) {
    try {
      const userData = await users.findAll();
      res.status(200).json({
        status: 200,
        message: "all users ",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default authController;
