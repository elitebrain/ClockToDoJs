const header = document.querySelector(".header"),
  thumbnails = document.querySelector(".thumbnails");

function setBg(event) {
  document.querySelector(".bgImage").src = event.target.src;
}

function setThumbnail() {
  for (let i = 0; i < IMG_NUMBER; i++) {
    const li = document.createElement("li");
    li.classList.add("thumbnail");
    const img = new Image();
    img.src = `images/${i + 1}.jpg`;
    img.addEventListener("click", setBg);
    li.appendChild(img);
    thumbnails.appendChild(li);
  }
}

function init() {
  setThumbnail();
}

init();
