## 参数传递

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

## 监听事件

const high5 = function () {
console.log('yeah');
};
document.body.addEventListener('click', high5);

## 回调函数

['Honas', 'Lily', 'sdf'].forEach(high5);

## 用箭头函数写函数返回其他函数

const greatNew = greating => name => console.log(`${greating}, ${name}`);

## 如果前两个满足了条件，则 ++

    // register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

## 神奇的函数

1.  const runOne = function () {
    console.log('this will never run again');
    };
    runOne();

2.  (function () {
    console.log('this will never run again');
    })();
3.  (() => console.log('this will also never run again'))();

## 闭包和正常的函数的调用

//////////////// 闭包
const secureBooking = function () {
let passengerCount = 0;

return function () {
passengerCount++;
console.log(`${passengerCount} passengers`);
};
};
const bookNew = secureBooking();
bookNew();

/////////////// 函数的调用
const secureBookingNew = function () {
let passengerCountNew = 1;

console.log(`${passengerCountNew} passengers`);
};
secureBookingNew();

## 计时器

setTimeout(function () {
console.log('Timer');
}, 1000);
