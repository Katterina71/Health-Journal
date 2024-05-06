import express from 'express';
import moment from 'moment';

import mongoose from 'mongoose';
import SleepLogs from '../model/sleepLogs.js';
import Users from '../model/users.js'; 

import {allData, postData, removeData, editData, getById} from '../controllers/sleepLogsControllers.js'


const router = express.Router();

router.get('/', allData);

router.get('/:id', getById);

router.post('/post/:username', postData)

router.delete('/remove/:username', removeData)

router.patch('/update/:id', editData) 

export default router