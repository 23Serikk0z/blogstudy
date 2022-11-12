import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'

import {registerValidator, loginValidator, postCreateValidator} from './validators.js'

import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())

mongoose
    .connect('mongodb+srv://xhero:wwwwww@cluster0.7bx3gbx.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('Db ok'))
    .catch((error) => console.log('Error', error))


app.post('/auth/register', registerValidator, UserController.register)
app.post('/auth/login', loginValidator, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)


app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidator, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)


app.listen(PORT, (err) =>{
    if(err){
        return console.log(err)
    }
    console.log('Ok')
})