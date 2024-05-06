
import express from 'express';
import mongoose from 'mongoose';
import Users from '../model/users.js';
import DailyHealth from '../model/dailyHealth.js';

// import {allData, postData, removeData, editData} from '../controllers/dailyHealthControllers.js'
import {allData, postData, removeData, updateData, getById} from '../controllers/dailyHealthControllers.js'

const router = express.Router();

router.get('/', allData);

router.get('/:id', getById);

router.post('/post/:id', postData);

router.delete('/remove/:userId/:date', removeData);

router.patch('/update/:userId/:date', updateData );

export default router