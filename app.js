'use strict'

const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))



const date = new Date()
const options = {weekday:'long', year: 'numeric', month: 'short', day: 'numeric'}
const today = date.toLocaleDateString('en-us', options)
console.log(today)

const newItemsArray = []



app.get('/', (req, res) => {
	res.render('list', {
		to_day: today,
		new_items_array: newItemsArray
	})
})


app.post('/', (req, res) => {
	let item = req.body.newItem
	newItemsArray.push(item)
	res.redirect('/')
})



app.listen(3000, () => console.log('Server is running on port 3000'))
