const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".done-list"),
  toDoListCover = document.querySelector(".js-cover"),
  toDoListCover2 = document.querySelector(".done-cover"),
  scrollBarBg = document.querySelector(".js-cover .scroll-bg"),
  scrollBarBg2 = document.querySelector(".done-cover .scroll-bg"),
  scrollBar = document.querySelector(".js-cover .scroll-active"),
  scrollBar2 = document.querySelector(".done-cover .scroll-active");

const TODOS_LS = "toDos";

let toDos = [];
let scroll = 0;
let scroll2 = 0;

function checkToDo(event) {
  const btn = event.target.parentNode;
  const li = btn.parentNode;
  const item = btn.previousElementSibling;
  const toDoListLS = JSON.parse(localStorage.getItem(TODOS_LS));
  const idx = toDoListLS.findIndex(v => v.text === item.innerText);
  const leftList = toDoListLS.filter((v, i) => i < idx);
  const rightList = toDoListLS.filter((v, i) => i > idx);
  const currentItem = toDoListLS.filter((v, i) => i === idx);
  if (currentItem[0].done === true) {
    currentItem[0] = Object.assign({}, currentItem[0], { done: false });
    console.log("doneList", doneList, doneList.childElementCount);
    // if (
    //   doneList &&
    //   doneList.children.findIndex(v => v.textContent === item.innerText) !== -1
    // ) {
    //   doneList.removeChild(li);
    // }
    for (let i = 0; i < doneList.childElementCount; i++) {
      console.log(doneList.children[i].textContent, item.innerText);
      if (doneList.children[i].textContent === item.innerText) {
        doneList.removeChild(doneList.children[i]);
      }
    }
    paintToDo(item.innerText, false);
  } else {
    currentItem[0] = Object.assign({}, currentItem[0], { done: true });
    console.log("toDoList", toDoList, toDoList.childElementCount);
    // if (
    //   toDoList &&
    //   toDoList.children.findIndex(v => v.textContent === item.innerText) !== -1
    // ) {
    //   toDoList.removeChild(li);
    // }
    for (let i = 0; i < toDoList.childElementCount; i++) {
      console.log(toDoList.children[i].textContent, item.innerText);
      if (toDoList.children[i].textContent === item.innerText) {
        toDoList.removeChild(toDoList.children[i]);
      }
    }
    paintToDo(item.innerText, true);
  }
  setScrollBar();
  localStorage.setItem(
    TODOS_LS,
    JSON.stringify(leftList.concat(currentItem).concat(rightList))
  );
}

function deleteToDo(event) {
  const btn = event.target.parentNode;
  const li = btn.parentNode;
  const key = btn.previousElementSibling.previousElementSibling.innerText;
  localStorage.removeItem(key);
  memoTitle.value = "";
  textArea.value = "";
  if (li.parentNode.classList.value === "done-list") {
    doneList.removeChild(li);
  } else if (li.parentNode.classList.value === "js-toDoList") {
    toDoList.removeChild(li);
  }
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  if (toDoList.childElementCount <= 10) {
    scrollBarBg.style.opacity = "0";
    scrollBar.style.opacity = "0";
  }
  if (doneList.childElementCount <= 9) {
    scrollBarBg2.style.opacity = "0";
    scrollBar2.style.opacity = "0";
  }
  setScrollBarHeight();
  saveToDos();
  scroll = toDoList.childElementCount - 10;
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
  scrollBar2.style.height = `${(9 / doneList.childElementCount) * 324}px`;
}
function onWheel2(event) {
  if (event.deltaY > 0) {
    if (scroll2 + 9 < doneList.childElementCount) {
      scroll2++;
    }
  } else {
    if (scroll2 > 0) {
      scroll2--;
    }
  }
  moveScroll2();
}

function moveScroll2() {
  doneList.style.transform = "translate3D(0px, " + scroll2 * -36 + "px, 0px)";
  scrollBar2.style.top =
    parseFloat((scroll2 * 324) / doneList.childElementCount) + "px";
}

function initScroll() {
  scrollBar.style.top = "0";
  toDoList.style.transform = `translate3D(0px, 0px, 0px)`;
}
function setScrollBar() {
  if (toDoList.childElementCount > 10) {
    scrollBarBg.style.opacity = "1";
    scrollBar.style.opacity = "1";
    toDoListCover.addEventListener("wheel", onWheel);
  } else {
    scrollBarBg.style.opacity = "0";
    scrollBar.style.opacity = "0";
  }
  console.log(doneList.childElementCount);
  if (doneList.childElementCount > 9) {
    scrollBarBg2.style.opacity = "1";
    scrollBar2.style.opacity = "1";
    toDoListCover2.addEventListener("wheel", onWheel2);
  } else {
    scrollBarBg2.style.opacity = "0";
    scrollBar2.style.opacity = "0";
  }
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
  span.addEventListener("click", toggleToDo);
  li.appendChild(span);
  li.appendChild(chkBtn);
  li.appendChild(delBtn);
  li.id = newId;
  if (done) {
    doneList.insertBefore(li, doneList.firstChild);
  } else {
    toDoList.insertBefore(li, toDoList.firstChild);
  }
  // toDoList.appendChild(li);
  setScrollBar();
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
    localStorage.getItem(TODOS_LS) &&
    JSON.parse(localStorage.getItem(TODOS_LS)).findIndex(
      v => v.text === currentValue
    ) !== -1
  ) {
    return;
  }
  paintToDo(currentValue, false);
  toDoInput.value = "";
  scroll = toDoList.childElementCount - 10;
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
