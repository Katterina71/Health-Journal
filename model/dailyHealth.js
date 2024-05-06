
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Snacks Sub-document Schema
const snacksSchema = new Schema ({
   snack : { 
    type: String
  }
}, {
  _id: false
});

// Exercise Sub-document Schema
const exerciseSchema = new Schema ({
  type: String,
  duration: Number,
  caloriesBurned: Number
}, {
  _id: false 
});

// Main Document Schema for Daily Health Logs
const dailyHealthSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',  
    required: true  
  },
  date: {
    type: Date,
    required: true,
  },
  diet: {
    breakfast: {
      type: String
    },
    lunch: {
      type: String
    },
    dinner: {
      type: String
    },
    snacks: [snacksSchema]
  },
  exercises: [exerciseSchema]
},
{_id: false}
)

dailyHealthSchema.index({ userId: 1, date: 1 }, { unique: true });

const DailyHealth = mongoose.model('DailyHealth',dailyHealthSchema)
  
  // module.exports = DailyHealth;
  export default DailyHealth;