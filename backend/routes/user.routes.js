import express from 'express';
import db from '../db/index.js';
import { userTable } from '../models/user.model.js';
import { signupPostRequestBodySchema , loginPostRequestbodySchema } from "../validations/req.validation.js"
import {hashedPasswordWithSalt} from "../utils/hash.js"
import {getUserByEmail} from "../services/user.service.js"
import {createUserToken} from "../utils/token.js"


const router = express.Router();

//signup route => 
router.post("/signup", async(req , res)=>{

    console.log("REQ BODY:", req.body);

    //validation check => 
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    //if any error in validation => 
    if(validationResult.error){
        return res.status(400).json({error:validationResult.error.format()})
    }
    //validation success=>
    const {firstname , lastname , email , password} = validationResult.data;


    const existingUser = await getUserByEmail(email);  //we make services folder and write code for existing user to reuse anywhere => signup , login
    if(existingUser) return res.status(400).json({error:`User with this email ${email} already exists`});


    const {salt , password:hashedPassword} = hashedPasswordWithSalt(password); // we made utils where we make reusable thing and import from it to use in our code like => signup , login 

    const [user] = await db.insert(userTable).values({
        firstname,
        lastname,
        email,
        salt,
        password:hashedPassword,

    }).returning({id:userTable.id});

    return res.status(201).json({message:"sign success" , data:{ userId:user.id}});


})

//login route =>
router.post("/login" , async(req,res)=>{

    const validationResult = await loginPostRequestbodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error:validationResult.error})
    }

    const {email , password} = validationResult.data;

    const user = await getUserByEmail(email); //reuse this  funtion that make in services
    if(!user){
        return res.status(404).json({error: `user with this email doesnot exists`})
    }

    const {password:hashedPassword} = hashedPasswordWithSalt(password , user.salt);

    if(user.password!==hashedPassword){
        return res.status(400).json({error: 'Invalid password'})
    }

    //token=>
    const token = await createUserToken({id:user.id});

    return res.status(200).json({message: "login success",data: {token,}});


})

  

export default router;
