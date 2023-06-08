import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {registerValidation} from './validation/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';


mongoose.connect('mongodb+srv://maxduma16:aYYy8AIjTqqYpWAP@cluster1.kehnoa2.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
  console.log("DB Ok")
})
.catch((e) => {
  console.error("DB Error", e);
})

const app = express();

app.use(express.json())

app.post('/auth/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({email: res.body.email})
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(404).json({
        message: 'Incorrect credentials'
      })
    }

    const token = jwt.sign({
      _id: user._id
    },
     'secret123',
     {expiresIn: '30d'}
    );
    const {passwordHash, ...userData} = user._doc;
    res.json({...userData, token});
  } catch (error) {
    console.error(error);
  }
})

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
  
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id
    },
     'secret123',
     {expiresIn: '30d'}
    );
    const {passwordHash, ...userData} = user._doc;
    res.json({...userData, token});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to register user'
    });
  }
})

app.listen(4444, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Server OK')
})

