const callback = (message) => {
  let recv = JSON.parse(message.body);
  console.log(recv);
  //   recv -> enter , exit,
  changeText(recv.sender);
};

const changeText = (text) => {
  //   document.querySelector('#socket-text').innerHTML = text;
};

export { callback, changeText };
