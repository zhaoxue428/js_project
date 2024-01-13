'use strict';

const bookings = [];
// ES6 设置默认值
const createBooking = function (
  fightNm,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    fightNm,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH324');
createBooking('KJK23', 2, 988);
createBooking('sdf23', undefined, 12);

////// 参数传递两种，导致有不同的影响
//按值传递： 不改变原始的变量
//按引用传递： 改变原始的变量
const flight = 'LN3434';
const jonas = {
  name: 'Jonasdf lily',
  passport: 234234,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'SB234'; // 这个参数是按值传递
  passenger.name = 'Mr' + passenger.name; //这个参数是按引用传递

  if (passenger.passport === 234234) {
    alert('Cehcked in');
  } else {
    alert('Wrong passport');
  }
};
checkIn(flight, jonas);
console.log(flight); // LN3434
console.log(jonas); // 改变

/////////
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};
newPassport(jonas);

checkIn(flight, jonas);

////// 函数的变压器
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function 函数变压器
const transformer = function (str, fn) {
  console.log(`Original string:${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best !', upperFirstWord);
transformer('JavaScript is the best !', oneWord);

/////////////// 监听事件
const high5 = function () {
  console.log('yeah');
};
document.body.addEventListener('click', high5);

////////////// 回调函数
['Honas', 'Lily', 'sdf'].forEach(high5);

////////////// 函数的本质；特殊的函数 -- 函数返回其他函数
const great = function (greating) {
  return function (name) {
    console.log(`${greating}, ${name}`);
  };
};
const greatHi = great('Hi');
greatHi('Lily');
greatHi('steven');
great('Hi')('lily');

// 用箭头函数来写
const greatNew = greating => name => console.log(`${greating}, ${name}`);
greatNew('Hello')('Lily');

////////////////  this关键词
const lufthansa = {
  airline: 'lsdf',
  code: 'LH',
  bookings: [],
  book(flightNm, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.code} ${flightNm}`
    );
    this.bookings.push({ flight: `${this.code}${flightNm}`, name });
  },
};

lufthansa.book(235, 'Lily');
lufthansa.book(234, 'Linda');
console.log(lufthansa);

const eurowings = {
  name: 'Eurowings',
  code: 'EW',
  bookings: [],
};

// 将函数储存到变量里， 那么这个变量也是函数
const book = lufthansa.book;

// Does not work
// book(23, 'sdfsdf');

//////////////  手动显示设置this关键词
// 1. call method
book.call(eurowings, 23, 'Sarsh Willams');
console.log(eurowings);
book.call(lufthansa, 23, 'Chunqius');
console.log(lufthansa);

const swiss = {
  name: 'chunqiu',
  code: 'Q',
  bookings: [],
};
book.call(swiss, 34, 'Lily');
console.log(swiss);

// 2. apply method
const flightData = [23, 'Georage Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// 3. bind method 不同：不会立即调用函数
// book.call(eurowings, 23, 'Sarsh Willams');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(34, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Scherm');
bookEW23('March Cooper');

///////////////////// this 关键词 with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// bug1
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // 原代码
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

////////////////  bind的另一个大用例
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.1);
// 上一行等同于： addVAT = value => value + value * rate;
console.log(addVAT(200));
console.log(addVAT(23));

/////////////////  code chanleenge 把上述功能 用一个函数返回另一个函数
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addTax2 = addTaxRate(0.1);
console.log(addTax2(200));

/////////////////
const runOne = function () {
  console.log('this will never run again');
};
runOne();

(function () {
  console.log('this will never run again');
})();

(() => console.log('this will also never run again'))();

//////////////// 闭包
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const bookNew = secureBooking(); // 需要一个变量来接受，这样内部函数才会执行
bookNew();

///////////////  函数的调用
const secureBookingNew = function () {
  let passengerCountNew = 1;

  console.log(`${passengerCountNew} passengers`);
};
secureBookingNew();

///////////////////  闭包例子1
let f; // 全局变量

const g = function () {
  const a = 23; // 局部变量
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // 调用函数 g，此时 f 被赋值为一个闭包，该闭包能访问变量
f(); // 调用全局变量 f，！！！仍然可以访问外部变量，输出 a * 2
console.dir(f); // a = 23

// re-assiging f function
// f函数在h的可变环境下也是闭的
h();
f(); // 此处的f和上面的f不是一个，因为值被重新赋值了
console.dir(f); // b = 777 原来的闭包没了

///////////////// 闭包例子2 --非常灵活的例子

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
