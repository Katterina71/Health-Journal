import express from 'express';
const router = express.Router();

// import { Collection, ObjectId } from 'mongodb'

import mongoose from 'mongoose';
import Users from '../model/users.js';
import {allData, addUser, removeUser, editUser, getById} from '../controllers/usersControllers.js'



router.get('/', allData);

router.get('/:id', getById);

router.post('/post', addUser);

router.patch('/update/:userId', editUser);

router.delete('/remove/:userId', removeUser);


export default router