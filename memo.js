const textArea = document.querySelector(".js-memo-list > textarea"),
  memoTitle = document.querySelector(".js-memo-list > input"),
  // saveBtn = document.querySelector(".js-memo-list > button"),
  fontSizeSpan = document.querySelector(
    ".js-memo-list > .setting > .font-size"
  ),
  fontSizeUp = document.querySelector(".js-memo-list > .setting > .size-up"),
  fontSizeDown = document.querySelector(
    ".js-memo-list > .setting > .size-down"
  );

let fontSize = 24;

function generateToast(gubun) {
  let backgroundColor;
  let text;
  if (gubun === "delete") {
    backgroundColor = "#f00";
    text = "삭제되었습니다.";
  } else if (gubun === "save") {
    backgroundColor = "#f384f3";
    text = "저장되었습니다.";
  } else if (gubun === "add") {
    backgroundColor = "#f384f3";
    text = "추가되었습니다.";
  }
  const el = document.querySelector(".toast");
  if (el) {
    el.style.display = "block";
    if (backgroundColor) {
      el.style.backgroundColor = backgroundColor;
    }
    el.innerText = text;
    setTimeout(() => (el.style.opacity = 1), 200);
    setTimeout(() => (el.style.opacity = 0), 1200);
    setTimeout(() => (el.style.display = "none"), 2200);
  }
}
function loadFontSize() {
  const fontSizeLS = localStorage.getItem("fontSize");
  if (fontSizeLS) {
    fontSize = fontSizeLS;
  }
}
function setFontSize() {
  fontSizeSpan.innerText = fontSize + "px";
  textArea.style.fontSize = fontSize + "px";
  localStorage.setItem("fontSize", fontSize);
}

function handleSave() {
  if (memoTitle.value.length === 0) {
    return;
  }
  // generateToast("save");
  localStorage.setItem(memoTitle.value, textArea.value);
}
function handleSizeUp() {
  if (fontSize >= 36) {
    return;
  }
  fontSize++;
  setFontSize();
}
function handleSizeDown() {
  if (fontSize <= 10) {
    return;
  }
  fontSize--;
  setFontSize();
}
function init() {
  // saveBtn.addEventListener("click", handleSave);
  fontSizeUp.addEventListener("click", handleSizeUp);
  fontSizeDown.addEventListener("click", handleSizeDown);
  loadFontSize();
  setFontSize();
}

init();
