const clockDIV = document.querySelector(".js-clock");

function getTime(){
  const toDay = new Date();
  const hour = toDay.getHours(),
    miniute = toDay.getMinutes(),
    second = toDay.getSeconds();
  
  const hourz = hour < 10 ? `0${hour}` : hour;
  const miniutez = miniute < 10 ? `0${miniute}` : miniute;
  const secondz = second < 10 ? `0${second}` : second;
  clockDIV.innerHTML = `<h1>${hourz}:${miniutez}:${secondz}</h1>`;

}
function init(){
  getTime();
  setInterval(getTime, 1000);
}
init();