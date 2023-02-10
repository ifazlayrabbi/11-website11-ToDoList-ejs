'use strict'

const express = require('express')
const app = express()






app.get('/', (req, res) => {
	const date = new Date()
	res.write('<p>'+date+'</p>\n\n')

	function printDayType(){
		if(date.getDay() == (5 || 6))
			res.write('<p>Hurray! It\'s a weekend in Dhaka.</p>')
		else
			res.write('<p>It\'s a weekday in Dhaka.</p>')
	}






	res.write("<h1><br>Today's Name - by using 'day number'</h1>")
	res.write('-------------------------------------------------------------------------------------------------\n\n')

	let todayNumber = date.getDay()
	console.log('Today Number = '+todayNumber)
	let todayName

	switch(todayNumber){
	case 0: 
		todayName = 'Sunday'
		break
	case 1:
		todayName = 'Monday'
		break
	case 2: 
		todayName = 'Tuesday'
		break
	case 3:
		todayName = 'Wednesday'
		break
	case 4: 
		todayName = 'Thursday'
		break
	case 5:
		todayName = 'Friday'
		break
	case 6:
		todayName = 'Saturday'
		break
	default:
		todayName = 'Error!'
		console.log('Error!')
	}

	res.write('<p>Today = '+todayName+'</p>\n')
	printDayType()






	res.write("<h1><br>Today's Name - by using 'day name'</h1>\n")
	res.write('-------------------------------------------------------------------------------------------\n\n')
	
	let todayName2 = ''+date
	todayName2 = todayName2.substring(0,3)+' day'
	
	res.write('<p>Today = '+todayName2+'</p>\n')
	printDayType()

	res.send()
})



app.listen(3000, () => console.log('Server is running on port 3000'))
