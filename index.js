import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';
import multer from 'multer';

mongoose.connect('mongodb+srv://maxduma16:aYYy8AIjTqqYpWAP@cluster1.kehnoa2.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
  console.log("DB Ok")
})
.catch((e) => {
  console.error("DB Error", e);
})

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Server OK');
})

