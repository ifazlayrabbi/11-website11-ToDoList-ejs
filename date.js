// How 'JavaScript module' works
// module.exports = getDate
// module.exports = getDayName


// exports.getDate = getDate
// function getDate(){

exports.getDate = () => {
    const date = new Date()

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    return date.toLocaleString('en-gb', options)
}


// exports.getDayName = getDayName
// function getDayName(){

exports.getDayName = () => {
    const date = new Date()

    const options = {weekday: 'long'}
    return date.toLocaleString('en-gb', options)
}



// console.log(module.exports)