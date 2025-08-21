// const fruits = ["Bananas", "Oranges", "Apples", "Mangos"];
const fruits = [
  { name: "Bananas" },
  { name: "Oranges" },
  { name: "Apples" },
  { name: "Mangos" },
];
// let fruit0 = fruits[0];
// console.log(fruit0);
// let fruit1 = fruits[1];
// console.log(fruit1);
// let fruit2 = fruits[2];
// console.log(fruit2);
// let fruit3 = fruits[3];
// console.log(fruit3);

let [fruit1, fruit2, fruit3, fruit4] = fruits;
// console.log(fruit1 + "\n" + fruit2 + "\n" + fruit3 + "\n" + fruit4);

// for (var i = 0; i < fruits.length; i++) {
//   //   let fruit = fruits[i];
//   console.log(fruits[i].name);
// }
let i = 0;
let fruit = fruits[i];
console.log(typeof fruits);
