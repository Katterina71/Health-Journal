import express from 'express';
const router = express.Router();

import { Collection, ObjectId } from 'mongodb'

import mongoose from 'mongoose';
import Users from '../model/users.js';
import {allData, addUser, removeUser, editUser} from '../controllers/usersControllers.js'



router.get('/', allData);

router.post('/add', addUser);

router.patch('/edit/:userId', editUser);

router.delete('/delete/:userId', removeUser);


export default router