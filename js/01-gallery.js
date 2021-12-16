import { galleryItems } from "./gallery-items.js";

const galleryEL = document.querySelector(".gallery");
const bodyEl = document.querySelector("body");
let modalImage;

// 1.Создание и рендер разметки по массиву данных galleryItems
//   и предоставленному шаблону элемента галереи.
//   Используй готовый код из первого задания.

const galleryMarkup = galleryItems
  .map(
    ({ original, preview, description }) =>
      `
<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join(" ");

// console.log(galleryItems[0]);
galleryEL.insertAdjacentHTML("beforeend", galleryMarkup);

// 2 / Реализация делегирования на div.gallery и получение url большого изображения.

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return;

  onOpenModal(e.target.dataset.source);
}
galleryEL.addEventListener("click", onImgClick);

//////////////////
// 1.Определить общего предка группы элементов для отслеживания событий. // gallery //
//
// 2 Зарегистрировать на элементе-предке обработчик события которое мы хотим отлавливать от группы элементов.
//
// 3 В обработчике использовать event.target для выбора целевого элемента./////////////
//

// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox

const onConnectionScriptAndStylesModal = (img) =>
  basicLightbox.create(` <img src = '${img}' width = '2100' alt = '${img}' >`);
// 4. Открытие модального окна по клику на элементе галереи.

const onOpenModal = (img) => {
  modalImage = onConnectionScriptAndStylesModal(img);
  modalImage.show();
  console.log("Open modal");
  document.addEventListener("keyup", onKeyPress);

};

const onKeyPress = event => {
  if (event.code === "Escape") modalImage.close();
  console.log("Close modal with escape");
  document.removeEventListener("keyup", onKeyPress);
  console.log(event);
};
