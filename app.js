
'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
 
require('dotenv').config() 
const _ = require('lodash')
const {ObjectId} = require('mongodb')
// const date = require(__dirname + '/date.js')
const date = require('./date')
const {List, Page} = require('./db')





// const date = new Date()
// const options = {weekday:'long', year: 'numeric', month: 'short', day: 'numeric'}
// const today = date.toLocaleDateString('en-us', options)

// const today = date()
const today = date.getDate()
// console.log(today)

let newItemsArray = []
const workItemsArray = []
	






app.get('/', async (req, res) => {
	try{
		const getItems = await List.find()

		res.render('list', {
			page_name: today,
			get_items: getItems,
			// delete_action: '/delete',
			// add_action: '/'
		})
	} catch (err) {
		res.send('<h1>Error!</h1>' + err.message)
		console.log(err.message)
	}
})

app.post('/', (req, res) => {
	let {new_item, page_name} = req.body

	const addItem = new List({
		name: new_item
	})

	if(page_name == today){
		async function func1 (){
			try{
				// await List.insertMany({
				// 	name: new_item
				// })
				await addItem.save()
				console.log('Homepage - item saved.')
				res.redirect('/')
			} catch (err) {console.log(err.message)}
		}
		func1()
	}
	else{
		async function func1(){
			try{
				await Page.updateOne(
					{name: page_name},
					{$push: {data: addItem}}
				)
				console.log('Dynamic page - item saved.')
				res.redirect('/get/' + page_name)
			} catch (err) {console.log(err.message)}
		}
		func1()
	}

})

app.post('/delete', (req, res) => {
	const {id, page_name} = req.body

	if(page_name == today){
		async function func1(){
			try{
				// await List.findByIdAndRemove(new ObjectId(id))
				await List.deleteOne({_id: new ObjectId(id)})
				console.log('Homepage - item deleted.')
				res.redirect('/')
			} catch(err) {console.log(err.message)}
		}
		func1()
	}
	else{
		async function func1(){
			try{
				await Page.updateOne(
					{name: page_name},
					{$pull: {data: {_id: new ObjectId(id)}}}
				)
				console.log('Dynamic page - item deleted.')
				res.redirect('/get/' + page_name)
			} catch (err) {console.log(err.message)}
		}
		func1()
	}
})

app.get('/get/:page', async (req, res) => {
	let pageName = _.capitalize(req.params.page)
	
	try{
		const page = await Page.findOne({name: pageName})
		if(page){
			res.render('list', {
				page_name: pageName,
				get_items: page.data,
				// delete_action: '/delete',
				// add_action: '/'
			})
		}
		else{
			const data1 = new Page({
				name: pageName,
				data: items
			})

			async function func1(){
				try{
					await data1.save()
					console.log('Page created.')
					res.send('New page created.')
				} catch (err){console.log(err.message)}
			}
			func1()
		}
	} catch (err) {
		res.send('<h1>Error!</h1>' + err.message)
		console.log(err.message)
	}

})








app.get('/work', (req, res) => res.render('list2', {
	to_day: 'Work',
	get_items: workItemsArray,
	delete_action: '/delete2',
	add_action: '/work'
}))

app.post('/work', (req, res) => {
	let item = req.body.new_item
	workItemsArray.push(item)
	res.redirect('/work')
})

app.post('/delete2', (req, res) => {
	const item = req.body.delete_item
	workItemsArray.pop()
	res.redirect('/work')
})

app.get('/about', (req, res) => res.render('about'))



		// console.log(getItems[0].name)

		// for(let i=0; i<getItems.length; i++){
		// 	console.log(getItems[i].name)
		// }

		// getItems.forEach(item => {
		// 	console.log(item.name)
		// })

		const itemA = new List({
			name: 'She plays Chess well'
		})
		const itemB = new List({
			name: 'She recites Quran beautifully'
		})
		const itemC = new List({
			name: 'She is a bright student'
		})
		const items = [itemA, itemB, itemC]



// object for Page
// {
// 	name: 'Class10'
// 	students: [
// 		{
// 			studentName: 'Kulsoom',
// 			subjects: [
// 				{
// 					subjectName: 'English',
// 					marks: 90
// 				},
// 				{
// 					subjectName: 'Maths',
// 					marks: 100
// 				}
// 			]
// 		},
// 		{
// 			studentName: 'Fatema',
// 			subjects: [
// 				{
// 					subjectName: 'English',
// 					marks: 70
// 				},
// 				{
// 					subjectName: 'Maths',
// 					marks: 80
// 				}
// 			]
// 		}
// 	]
// }





async function testQuery () {
	try{
		
		// let find1 = await Page.findOne(
		// 	{'data._id': '6412b33eec028cfd488495fc'},
		// 	{data: 1, _id: 0}
		// )
		// console.log(find1)


		// await Page.updateOne(
		// 	{name: 'Zainab'},
		// 	{$pull: {data: {name: 'She recites Quran beautifully'}}},
		// )
		

		// await Page.updateOne(
		// 	{name: 'Zainab'},
		// 	{$pull: {data: {name: 'She recites Quran beautifully', _id: '64149675734c0d9715712b1b'}}}
		// )



		// DOESN'T WORK
		// ------------------------------------------------------------
		// await Page.updateOne(
		// 	{name: 'class8'},
		// 	{$pull: {'students.$[var1].subjects': {subjectName: 'English'}}},
		// 	{arrayFilters: [{'var1.studentName': 'Kulsoom'}]}
		// )

		// await Page.updateOne(
		// 	{name: 'class8'},
		// 	{$pull: {'students.subjects': {subjectName: 'English'}}}
		// )

		// await Page.updateOne(
		// 	{name: 'class8'},
		// 	{$set: {'students.$[elem].subjects.$[elem2].marks': 60}},
		// 	{arrayFilters: [{'elem.studentName': 'Kulsoom'},{'elem2.subject': 'English'}]}
		// )
		// -----------------------------------------------------------

	
	} catch (err) {console.log(err.message)}
}
// testQuery()






const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running on port '+port))
