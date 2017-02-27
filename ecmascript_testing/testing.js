const value  ="1,2,3";
const value1  ="1,23433r";

const regexp = new RegExp('^[0-9]+,[0-9]+,[0-9]+$');


console.log (regexp.test(value));
console.log (regexp.test(value1));


console.log(Math.floor(Math.random() * 3) + 1);
console.log(Math.floor(Math.random() * 3) + 1);
console.log(Math.floor(Math.random() * 3) + 1);