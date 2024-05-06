// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;


const usersSchema = new Schema({

    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, 'Username must be at least 5 characters long'],
      maxlength: [30, 'Username must not exceed 30 characters']
    },
    email: {
      type: String,
      required: true,
      unique: true ,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'] 
    },
    password: {
      type: String,
      required: true,
      unique: true 
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    }
  })


  const Users = mongoose.model('Users',usersSchema)
  
  // module.exports = Users;
  export default Users;