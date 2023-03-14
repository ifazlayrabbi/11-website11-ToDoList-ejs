
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster0.pbwxcxc.mongodb.net/?retryWrites=true&w=majority')



const listSchema = mongoose.Schema({
  name: String
})
const List = mongoose.model('List', listSchema)
exports.List = List




