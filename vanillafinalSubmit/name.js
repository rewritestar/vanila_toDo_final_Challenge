const nameForm = document.querySelector(".js-name"),
  input = nameForm.querySelector("input");

const USER_NAME = "NAME";


function saveName(name){
  localStorage.setItem(USER_NAME, name);
  loadName();
}

function inputHandler (event){
  event.preventDefault();
  const userName = input.value;
  saveName(userName);
}

function loadName(){
  const nameLS = localStorage.getItem(USER_NAME);

  if(nameLS === null){
    nameForm.addEventListener("submit", inputHandler);
  }else{nameForm.innerHTML = `Hello ${nameLS} !`;
  }
}

function init(){
  loadName();
}

init();