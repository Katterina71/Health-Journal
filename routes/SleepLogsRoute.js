import express from 'express';
import moment from 'moment';

import mongoose from 'mongoose';
import SleepLogs from '../model/sleepLogs.js';
import Users from '../model/users.js'; 

import {allData, postData, removeData, editData} from '../controllers/sleepLogsControllers.js'


const router = express.Router();

router.get('/', allData);

router.post('/add/:username', postData)

router.delete('/delete/:username', removeData)

router.patch('/edit/:id', editData) 

export default router