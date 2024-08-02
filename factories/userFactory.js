const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const config = require('../configs/config');
const bcrypt = require('bcrypt');

mongoose.connect(config.databaseUrl).then(() => {
  console.log('database connected')
}).catch((err) => {
  console.log("Error:", err)
})

userModel.insertMany([
  {
    username: "muhali16",
    password: bcrypt.hash('password', 10)
  },
  {
    username: "muhali17",
    password: bcrypt.hash('password', 10)
  },
]).then(()=>{
  console.log('Seed success')
}).catch((err) => {
  console.log(err)
})

