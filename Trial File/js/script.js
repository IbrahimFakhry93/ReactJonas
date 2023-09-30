

// const now = new Date();
// now.setDate(now.getDate() + 1);
// console.log(now);
// const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
// console.log(now.toLocaleDateString('en-US', options)); // Tue Jun 22 2027
// now.setDate(now.getDate() + 2);
// console.log(now.toLocaleDateString('en-US', options)); // Thu Jun 24 2027


// //? another way of formatting:
// const dateNow = new Date();
// dateNow.toDateString();

// console.log(dateNow.toDateString());



const date = new Date();            
  console.log(date.toDateString());                    //*  Wed Sep 06 2023
  console.log(date.setDate(date.getDate() + 1));       //*  1694093807057
  console.log(date.toDateString());                    //*  Thu Sep 07 2023

console.log(new Date(date.setDate(date.getDate() + 1)));   //* Fri Sep 08 2023 16:39:43 GMT+0300 (Eastern European Summer Time)