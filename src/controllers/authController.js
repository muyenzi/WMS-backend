//import Models from "../database/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { decode, encode } from "../helpers/jwtTokenizer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Models from "../database/models";
import generateRandomPassword from "../helpers/passwordGenerator";
import generateAuthCode from "../helpers/generateAuthCode";
const { users } = Models;
//const mailgun = require("mailgun-js");
dotenv.config();

class authController {
  static async signup(req, res) {

    try {
      const { email, password, authCode } = req.body;
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      const found = await users.findOne({
        where: { authCode: authCode },
      });
      if (req.user) {
        return res.status(400).json({
          status: 400,
          message: " Email already exist please use onather!",
        });
      }
      if (found) {
        const updatedUser = await users.update(
          {
            email: email,
            isActive:true,
            password: hashPassword,
          },
          { where: { authCode: authCode }, returning: true }
        );
        return res.status(200).json({
          status: 200,
          message: "Account Created successfull!",
          data: updatedUser,
        });
      }
      return res.status(400).json({
        status: 400,
        message: "You are not authorize to create an Account",
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
            const dbId = req.user.id;
            const dbFullName=req.user.fullname
            const token = await encode({
              email,
              dbRole,
              dbId,
              dbFullName
            });
            const decodedToken = await decode(token);
            // const userSchoolId = decodedToken.userSchooldbId;
            // const userDistrictId = decodedToken.userDistrictdbId;
            const Email = decodedToken.email;
            const role = decodedToken.dbRole;
            const fullName=decodedToken.dbFullName
            return res.status(200).json({
              status: 200,
              message: "User logged with Token",
              data: {
                user: Email,
                role: role,
                fullName:fullName,
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
  static async AddnewUser(req, res) {
    try {
        const { fullname, role } = req.body;
        //const password = generateRandomPassword();
       // console.log("password:",password)
       // const salt = await bcrypt.genSaltSync(10);
        //const hashedPassword = await bcrypt.hashSync(password, salt);
         const data= await users.create({
            id: uuidv4(),
            fullname,
            email:null,
            role,
            isActive: false,
            password:null,
            authCode:generateAuthCode(),
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
