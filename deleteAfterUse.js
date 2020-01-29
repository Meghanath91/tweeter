var s = new Date(1504095567183).toLocaleTimeString("en-US")
// expected output "3:19:27 PM"
console.log((s));
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log((time));
console.log(date.toLocaleTimeString('en-US', { hour12: false }));