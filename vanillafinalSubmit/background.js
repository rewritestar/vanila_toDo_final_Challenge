const divCN = document.querySelector(".js-backgroundImage");
const IMG_NUM = 6;

function paintImg(){
  const img = new Image();
  const randNum = Math.floor(Math.random() * IMG_NUM + 1);
  img.src = `./images/${randNum}.jpg`;
  img.id = "bgImg";
  divCN.appendChild(img);
}

function init(){
  paintImg();
}
init();
