const weatherCN = document.querySelector(".js-weather");

const COORDS = "COORDS";
const API_KEY = "4a549432e2e9eacaaa2f9d0a775367f9";

function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    const temp = json.main.temp;
    const place = json.name;
    weatherCN.innerText = `${place} @ ${temp}`;
  });
}

function savePosition(obj){
  localStorage.setItem(COORDS, JSON.stringify(obj));
}

function handleSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  savePosition(coordsObj);
  getWeather(latitude, longitude);
}
function handleError(){
  console.log("error");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function load(){
  const loadCoords = localStorage.getItem(COORDS);
  if(loadCoords === null){
    askForCoords();
  }else{
    const parsedCoords = JSON.parse(loadCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  load();
}

init();
