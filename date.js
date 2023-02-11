// How 'JavaScript module' works
// module.exports = getDate
// module.exports = getDayName


// exports.getDate = getDate
// function getDate(){

exports.getDate = () => {
    const date = new Date()

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }
    return date.toLocaleString('en-US', options)
}


// exports.getDayName = getDayName
// function getDayName(){

exports.getDayName = () => {
    const date = new Date()

    const options = {weekday: 'long'}
    return date.toLocaleString('en-US', options)
}



// console.log(module.exports)