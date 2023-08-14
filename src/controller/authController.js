import { User } from '../model/user.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

export class AuthController {
    constructor() {}

    async register(req, res) {
         // Get user input
      const { first_name, last_name, email, password } = req.body;
      
      try {
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const existUser = await User.findOne({ email });

        if (existUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
       
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
     
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          createdAt: new Date(),
          password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          dotenv.config().parsed?.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);


      } catch(err) {
        console.log(err);
      }
    };

    async login(req, res) {
         // Get user input
      const { email, password } = req.body;
      console.log(req.body)
      try {
        if (!( email && password )) {
          res.status(400).send('All inputs is required');
        } 
        // Validate if user exist in our database
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            dotenv.config().parsed?.SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
          
          // save user token
          user.token = token;

          // user
          res.status(200).json(user);
        };
        
        res.status(400).send('Invalid Credentials');

      } catch (err) {
        console.log(err)
      }
    };
} 