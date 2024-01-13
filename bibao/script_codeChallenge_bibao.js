'use strict';
// 绝绝子啊！！！ 关于闭包和事件监听的绝妙例子 我自己写的
// let colorToBlue;

// const colorChange = function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   colorToBlue = function () {
//     header.style.color = 'blue';
//   };
// };
// colorChange();
// document.body.addEventListener('click', colorToBlue);
// document.querySelector('body').addEventListener('click', colorToBlue);

// 老师的方法 --立即执行函数和 回调函数
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
