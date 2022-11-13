import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {registerValidator, loginValidator, postCreateValidator} from './validators.js'
import { UserController, PostController } from './controllers/index.js'

import {checkAuth, handleErrors} from "./utils/index.js";

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads')
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
})

mongoose
    .connect('mongodb+srv://xhero:wwwwww@cluster0.7bx3gbx.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('Db ok'))
    .catch((error) => console.log('Error', error))


app.post('/auth/register', registerValidator, handleErrors, UserController.register)
app.post('/auth/login', loginValidator, handleErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidator, handleErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidator, handleErrors, PostController.update)

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


app.listen(PORT, (err) =>{
    if(err){
        return console.log(err)
    }
    console.log('Ok')
})