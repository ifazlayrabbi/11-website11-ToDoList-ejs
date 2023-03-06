// JavaScript module                       // each JS file is a - 'JS module'

// module.exports = getDate                // either getDate can be exported
// module.exports = getDayName             // or getDayName can be exported

// module.exports.getDate = getDate        // both can be exported
// module.exports.getDayName = getDayName  // both can be exported



exports.getDate = getDate
function getDate(){

// exports.getDate = () => {
    const date = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }
    return date.toLocaleString('en-US', options)
}
console.log(getDate())



// exports.getDayName = getDayName
// function getDayName(){                // function can be exported

// const getDayName = () => {            // variable cannot be exported    (but, function can be called)
exports.getDayName = () => {             // here, function can not be called - within this file    (because, function name is not declared)
    const date = new Date()
    const options = {weekday: 'long'}
    return date.toLocaleString('en-US', options)
}
// console.log(getDayName())




console.log(module.exports)             // 'JS module' is an Object
// console.log(exports)