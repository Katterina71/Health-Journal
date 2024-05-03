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
    type: Date,
    required: true,
  },
  hoursSlept: {
    type: Number,
    required: true
  }
}
)

// Creating a compound unique index on userId and date
sleepLogsSchema.index({ userId: 1, date: 1 }, { unique: true });

const SleepLogs = mongoose.model('SleepLogs',sleepLogsSchema)
  
// module.exports = SleepLogs;
export default SleepLogs;