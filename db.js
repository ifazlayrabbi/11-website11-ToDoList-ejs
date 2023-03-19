
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://'+process.env.user+':'+process.env.pass+'@cluster0.pbwxcxc.mongodb.net/?retryWrites=true&w=majority')
// mongosh "mongodb+srv://cluster0.pbwxcxc.mongodb.net/myFirstDatabase" --apiVersion 1 --username put_user_name




const listSchema = mongoose.Schema({
  name: String
})
const List = mongoose.model('List', listSchema)
exports.List = List



// const pageSchema = mongoose.Schema({
//   name: String,
//   data: [listSchema]
// })
// const Page = mongoose.model('Page', pageSchema)
// exports.Page = Page



const pageSchema = mongoose.Schema({
  name: String,
  data: [listSchema],
  students: [
    {
      studentName: String,
      subjects: [
        {
          subjectName: String,
          marks: Number
        }
      ]
    }
  ]
})
const Page = mongoose.model('Page', pageSchema)
exports.Page = Page