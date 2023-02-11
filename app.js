'use strict'

const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

require('dotenv').config()

const date = require(__dirname + '/date.js')




// const date = new Date()
// const options = {weekday:'long', year: 'numeric', month: 'short', day: 'numeric'}
// const today = date.toLocaleDateString('en-us', options)

// const today = date()
const today = date.getDate()
console.log(today)

const newItemsArray = []
const workItemsArray = []



app.get('/', (req, res) => {
	res.render('list', {
		to_day: today,
		new_items_array: newItemsArray,
		action_value: '/'
	})
})

app.post('/', (req, res) => {
	let item = req.body.newItem
	newItemsArray.push(item)
	res.redirect('/')
})





app.get('/work', (req, res) => res.render('list', {
    to_day: 'Work',
    new_items_array: workItemsArray,
    action_value: '/work'
}))

app.post('/work', (req, res) => {
    let item = req.body.newItem
    workItemsArray.push(item)
    res.redirect('/work')
})





app.get('/about', (req, res) => res.render('about'))



const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port '+port))
