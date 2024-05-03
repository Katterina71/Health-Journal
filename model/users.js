// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const usersSchema = new Schema({

    username: {
      type: String,
      required: true,
      unique: true 
    },
    email: {
      type: String,
      required: true,
      unique: true ,
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