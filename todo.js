const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDoListCover = document.querySelector(".js-cover"),
  scrollBarBg = document.querySelector(".js-cover .scroll-bg"),
  scrollBar = document.querySelector(".js-cover .scroll-active");

const TODOS_LS = "toDos";

let toDos = [];
let scroll = 0;

function checkToDo(event) {
  const btn = event.target.parentNode;
  const li = btn.parentNode;
  const item = btn.previousElementSibling;
  if (item.style.color === "") {
    item.style.textDecoration = "line-through";
    item.style.color = "#fff";
  } else {
    item.style.textDecoration = "";
    item.style.color = "";
  }
}

function deleteToDo(event) {
  const btn = event.target.parentNode;
  const li = btn.parentNode;
  const key = btn.previousElementSibling.previousElementSibling.innerText;
  localStorage.removeItem(key);
  memoTitle.value = "";
  textArea.value = "";
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  if (toDoList.childElementCount <= 10) {
    scrollBarBg.style.opacity = "0";
    scrollBar.style.opacity = "0";
  }
  setScrollBarHeight();
  saveToDos();
  scroll = toDoList.childElementCount - 10;
  // moveScroll();
  generateToast("delete");
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function toggleToDo(event) {
  handleSave();
  const span = event.target;
  memoTitle.value = span.innerText;
  const memo = localStorage.getItem(memoTitle.value);
  textArea.value = memo;
  textArea.focus();
}

function onWheel(event) {
  const prevY = toDoList.style.transform.split("px, ")[1];
  const numPrevY = parseInt(prevY, 10);
  if (event.deltaY > 0) {
    if (scroll + 10 < toDoList.childElementCount) {
      scroll++;
    }
  } else {
    if (scroll > 0) {
      scroll--;
    }
  }
  moveScroll();
}

function moveScroll() {
  toDoList.style.transform = "translate3D(0px, " + scroll * -36 + "px, 0px)";
  scrollBar.style.top =
    parseFloat((scroll * 360) / toDoList.childElementCount) + "px";
}

function setScrollBarHeight() {
  scrollBar.style.height = `${(10 / toDoList.childElementCount) * 360}px`;
}

function initScroll() {
  scrollBar.style.top = "0";
  toDoList.style.transform = `translate3D(0px, 0px, 0px)`;
}

function paintToDo(text, done) {
  const li = document.createElement("li");
  const delBtn = document.createElement("span");
  const chkBtn = document.createElement("span");
  chkBtn.style.width = "24px";
  chkBtn.style.height = "24px";
  chkBtn.style.marginRight = "12px";
  chkBtn.innerHTML = `<img src="./icons/check(white).svg" width="100%" height="100%" />`;
  chkBtn.addEventListener("click", checkToDo);
  delBtn.style.width = "24px";
  delBtn.style.height = "24px";
  delBtn.style.marginRight = "12px";
  delBtn.innerHTML = `<img src="./icons/trash(white).svg" width="100%" height="100%" />`;
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  if (done) {
    span.style.textDecoration = "line-through";
    span.style.textDecorationColor = "#e82ee8";
    span.style.color = "#fff";
  }
  span.addEventListener("click", toggleToDo);
  li.appendChild(span);
  li.appendChild(chkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.insertBefore(li, toDoList.firstChild);
  // toDoList.appendChild(li);
  if (toDoList.childElementCount > 10) {
    if (toDoListCover.style.opacity === "") {
      scrollBarBg.style.opacity = "1";
      scrollBar.style.opacity = "1";
    }
    toDoListCover.addEventListener("wheel", onWheel);
  }
  const toDoObj = {
    text,
    id: newId,
    done
  };
  toDos.push(toDoObj);
  setScrollBarHeight();
  saveToDos(toDos);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue.length === 0) {
    return;
  }
  if (
    JSON.parse(localStorage.getItem(TODOS_LS)).findIndex(
      v => v.text === currentValue
    ) !== -1
  ) {
    return;
  }
  paintToDo(currentValue);
  toDoInput.value = "";
  scroll = toDoList.childElementCount - 10;
  // moveScroll();
  generateToast("add");
}

function loadToDo() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text, toDo.done);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
