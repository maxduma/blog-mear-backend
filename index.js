import express from 'express';
import mongoose from 'mongoose';
import {registerValidation} from './validation/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose.connect('mongodb+srv://maxduma16:aYYy8AIjTqqYpWAP@cluster1.kehnoa2.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
  console.log("DB Ok")
})
.catch((e) => {
  console.error("DB Error", e);
})

const app = express();

app.use(express.json())

app.post('/auth/login', UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.listen(4444, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Server OK')
})

