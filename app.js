'use strict'

const express = require('express')
const app = express()





const date = new Date()
const options = {weekday:'long'}
const today = date.toLocaleDateString('en-us', options)
console.log(today)


app.get('/', (req, res) => {	

	if((today=='Friday')||(today=='Saturday'))
		res.sendFile(__dirname + '/weekend.html')
	else
		res.sendFile(__dirname + '/weekday.html')
})



app.listen(3000, () => console.log('Server is running on port 3000'))
