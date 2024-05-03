// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const sleepLogsSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',  
    required: true  
  },
  date: {
    type: Date
  },
  hoursSlept: {
    type: Number
  }
})


  const SleepLogs = mongoose.model('SleepLogs',sleepLogsSchema)
  
  // module.exports = SleepLogs;
  export default SleepLogs;