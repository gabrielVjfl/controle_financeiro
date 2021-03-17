const mongoose = require('mongoose')


const Schema = mongoose.Schema

const Users = new Schema({
   name: {
       type: String,
       required: true,
   },
   email: {
       type: String,
       required: true,
       unique: true,
       trim: true
   },
   password: {
       type: String,
       required: true
   },
   createdAt: {
    type: Date,
    default: Date.now()
}
})
module.exports = mongoose.model('Users', Users)