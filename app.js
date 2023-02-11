'use strict'

const express = require('express')
const app = express()

app.set('view engine', 'ejs')





const date = new Date()
const options = {weekday:'long'}
const today = date.toLocaleDateString('en-us', options)
console.log(today)

let dayType

if((today=='Friday')||(today=='Saturday'))
	dayType = 'Weekend'
else
	dayType = 'Weekday'



app.get('/', (req, res) => {
	res.render('list', {
		to_day: today,
		day_type: dayType
	})
})



app.listen(3000, () => console.log('Server is running on port 3000'))
