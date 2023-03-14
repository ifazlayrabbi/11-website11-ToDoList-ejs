
'use strict'

const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

require('dotenv').config()

// const date = require(__dirname + '/date.js')
const date = require('./date')
const {List} = require('./db')





// const date = new Date()
// const options = {weekday:'long', year: 'numeric', month: 'short', day: 'numeric'}
// const today = date.toLocaleDateString('en-us', options)

// const today = date()
const today = date.getDate()
console.log(today)





let newItemsArray = []
const workItemsArray = []

app.get('/', (req, res) => {
	newItemsArray = []
	async function func1(){
		try{
			const getItems = await List.find()
			getItems.forEach((item) => {
				newItemsArray.push(item.name)
			})
		} catch(err) {console.log(err.message)}

		res.render('list', {
			to_day: today,
			new_items_array: newItemsArray,
			action_value: '/'
		})
	}
	func1()

	
})

app.post('/', (req, res) => {
	let {new_item} = req.body
	// newItemsArray.push(item)

	const addItem = new List({
		name: new_item
	})
	if(new_item){
		async function func1 (){
			try{
				await addItem.save()
				console.log('Item is saved in the database.')
			} catch (err) {console.log(err.message)}
		}
		func1()
	}

	res.redirect('/')
})

app.get('/work', (req, res) => res.render('list', {
    to_day: 'Work',
    new_items_array: workItemsArray,
    action_value: '/work'
}))

app.post('/work', (req, res) => {
    let item = req.body.new_item
    workItemsArray.push(item)
    res.redirect('/work')
})

app.get('/about', (req, res) => res.render('about'))



const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port '+port))
