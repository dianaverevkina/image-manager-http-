export default class ImageView {
  // Создаем элемент картинки
  static renderImgElement({ id, path, name }) {
    const imgEl = document.createElement('div');
    imgEl.classList.add('images__item', 'item');
    imgEl.setAttribute('data-id', id);
    imgEl.innerHTML = `
      <div class="item__img">
        <img src=${path} alt=${name} class="item__img-picture">
      </div>
      <div class="item__delete">
        <img src="./images/cross.jpg" alt="cross-icon" class="item__cross">
      </div>
    `;

    return imgEl;
  }
}
