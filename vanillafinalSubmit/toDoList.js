const toDoCN = document.querySelector(".js-toDoList"),
  toDoForm = toDoCN.querySelector("form"),
  toDoInput = toDoForm.querySelector("input"),
  pendingCN = toDoCN.querySelector(".pending"),
  finishedCN = toDoCN.querySelector(".finished");

const PENDING_LS = "PENDING",
  FINISHED_LS = "FINISHED";

let pendingList = [],
  finishedList = [];

function makePendingObj(task){
  return pendObj = {
    id : String(Date.now()),
    task : task
  };
}

function makeFinishedObj(li){
   const span = li.querySelector("span");
   return finObj = {
     id : li.id,
     task : span.innerText
   }
}

function deleteFinished(e){
  const btn = e.target;
  const li = btn.parentNode;
  finishedCN.removeChild(li);  //html에서 없애기
  const newFinishedList = finishedList.filter(function(toDo){
    return parseInt(toDo.id) !== parseInt(li.id);
  }) //list에서 없애기
  finishedList = newFinishedList;
  finishedLSUpdate(); //LS에서 없애기
}

function finishedLSUpdate(){
  localStorage.setItem(FINISHED_LS,JSON.stringify(finishedList));
}

function finishedListUpdate(object){
  const finishedLS = localStorage.getItem(FINISHED_LS);
  if(finishedLS !== null){
    finishedList = JSON.parse(finishedLS);
  }
  finishedList.push(object);
}

function rependingListUpdate(object){
  const pendingLS = localStorage.getItem(PENDING_LS);
  if(pendingLS !== null){
    pendingList = JSON.parse(pendingLS);
  }
  pendingList.push(object);
}

function rePending(e){
  deleteFinished(e);
  const btn = e.target;
  const li = btn.parentNode;
  const rependObj = makeFinishedObj(li);
  paintPending(rependObj);
  rependingListUpdate(rependObj);
  pendingLSUpdate();
}

function paintFinished(object){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const rePendBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinished);
  rePendBtn.innerText = "➕";
  rePendBtn.addEventListener("click", rePending);
  span.innerText = object.task;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(rePendBtn);
  li.id = object.id;
  finishedCN.appendChild(li);
}

function finishedPending(e){
  deletePending(e);
  const btn = e.target;
  const li = btn.parentNode;
  const finObj = makeFinishedObj(li);
  paintFinished(finObj);
  finishedListUpdate(finObj);
  finishedLSUpdate();
}

function deletePending(e){
  const btn = e.target;
  const li = btn.parentNode;
  pendingCN.removeChild(li);  //html에서 없애기
  const newPendingList = pendingList.filter(function(toDo){
    return parseInt(toDo.id) !== parseInt(li.id);
  }) //list에서 없애기
  pendingList = newPendingList;
  pendingLSUpdate(); //LS에서 없애기
}

function paintPending(object){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "❌";
  chkBtn.innerText = "✔";
  delBtn.addEventListener("click", deletePending);
  chkBtn.addEventListener("click", finishedPending);
  span.innerText = object.task;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(chkBtn);
  li.id = object.id;
  pendingCN.appendChild(li);
}

function pendingLSUpdate(){
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
}

function pendingListUpdate(text){
  const obj = makePendingObj(text)
  pendingList.push(obj);
  return obj;
}

function inputHandler(e){
  e.preventDefault();
  const inputValue = `${toDoInput.value} `;
  toDoInput.value = "";
  const pendObj = pendingListUpdate(inputValue);
  pendingLSUpdate();
  paintPending(pendObj);
}

function load(){
  const pendingLS = localStorage.getItem(PENDING_LS),
    finishedLS = localStorage.getItem(FINISHED_LS);
  if(pendingLS !== null){
    const parsed = JSON.parse(pendingLS);
    parsed.forEach(function(toDo){
      pendingList.push(toDo);
    })
    pendingList.forEach(function(toDo){
      paintPending(toDo);
  })
  }
  if(finishedLS !== null){
    const parsed = JSON.parse(finishedLS);
    parsed.forEach(function(toDo){
      finishedList.push(toDo);
    })
    finishedList.forEach(function(toDo){
      paintFinished(toDo);
  })
  }
}
function init(){
  load();
  toDoForm.addEventListener("submit", inputHandler);
}
init();
