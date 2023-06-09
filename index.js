import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.connect('mongodb+srv://maxduma16:aYYy8AIjTqqYpWAP@cluster1.kehnoa2.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
  console.log("DB Ok")
})
.catch((e) => {
  console.error("DB Error", e);
})

const app = express();

app.use(express.json())

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.patch('/posts/:id', checkAuth, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Server OK')
})

