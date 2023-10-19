/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/ImageView.js
class ImageView {
  // Создаем элемент картинки
  static renderImgElement(_ref) {
    let {
      id,
      path,
      name
    } = _ref;
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
;// CONCATENATED MODULE: ./src/js/api/createRequest.js
const createRequest = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let callback = arguments.length > 1 ? arguments[1] : undefined;
  // eslint-disable-line 
  fetch(options.url, {
    method: options.method,
    body: options.data
  }).then(response => {
    if (response.status === 204) {
      callback();
      return;
    }
    response.json().then(result => callback(result));
  }).catch(e => {
    console.error('Произошла ошибка: ', e);
  });
};
/* harmony default export */ const api_createRequest = (createRequest);
;// CONCATENATED MODULE: ./src/js/ImageService.js

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
class ImageService {
  constructor() {
    this.URL = 'http://localhost:3000';
  }

  // Получить все файлы
  list(callback) {
    api_createRequest({
      url: `${this.URL}/files`,
      method: 'GET'
    }, callback);
  }

  // Получить один файл
  get(id, callback) {
    api_createRequest({
      url: `${this.URL}/files/${id}`,
      method: 'GET'
    }, callback);
  }

  // Создать файл
  create(data, callback) {
    api_createRequest({
      url: `${this.URL}/files`,
      method: 'POST',
      data
    }, callback);
  }

  // Удалить файл
  delete(id, callback) {
    api_createRequest({
      url: `${this.URL}/files/${id}`,
      method: 'DELETE'
    }, callback);
  }
}
;// CONCATENATED MODULE: ./src/js/File.js
class File {
  constructor(_ref) {
    let {
      id,
      filename,
      path
    } = _ref;
    this.id = id; // идентификатор (уникальный в пределах системы)
    this.name = filename; // имя файла
    this.path = path; // путь, по которому можно получить файл
  }
}
;// CONCATENATED MODULE: ./src/js/ImageWidget.js



class ImageWidget {
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    }
    this.fileContainer = this.container.querySelector('.file-container');
    this.containerContent = this.fileContainer.querySelector('.file-container__content');
    this.btnAddFile = this.fileContainer.querySelector('.btn-add');
    this.input = this.fileContainer.querySelector('.file-container__input');
    this.imagesContainer = this.container.querySelector('.images__container');
    this.imageService = new ImageService();
    this.deleteImg = this.deleteImg.bind(this);
    this.addEvents();
  }

  // Загружаем все картинки с сервера
  init() {
    this.imageService.list(response => {
      if (response.length !== 0) {
        response.files.forEach(img => {
          const file = new File(img);
          const fileEl = ImageView.renderImgElement(file);
          this.imagesContainer.append(fileEl);
        });
      }
    });
  }

  // Добавляем обработчики событий
  addEvents() {
    this.fileContainer.addEventListener('dragover', e => {
      e.preventDefault();
      this.containerContent.classList.add('file-container__content_hovered');
    });
    this.fileContainer.addEventListener('dragleave', () => {
      this.containerContent.classList.remove('file-container__content_hovered');
    });
    this.fileContainer.addEventListener('drop', e => {
      e.preventDefault();
      this.containerContent.classList.remove('file-container__content_hovered');
      const {
        files
      } = e.dataTransfer;
      [...files].forEach(file => this.createImageFile(file));
    });
    this.btnAddFile.addEventListener('click', e => {
      e.preventDefault();
      this.input.value = '';
      this.input.dispatchEvent(new MouseEvent('click'));
    });
    this.input.addEventListener('change', () => {
      const {
        files
      } = this.input;
      if (files.length === 0) return;
      [...files].forEach(file => this.createImageFile(file));
    });
    this.imagesContainer.addEventListener('click', e => this.deleteImg(e));
  }

  // Создаем картинку
  createImageFile(img) {
    const formData = new FormData();
    formData.append('file', img);
    this.imageService.create(formData, response => {
      if (response) {
        const file = new File(response.file);
        const fileEl = ImageView.renderImgElement(file);
        this.imagesContainer.append(fileEl);
      }
    });
  }

  // Удаляем изображение
  deleteImg(e) {
    e.preventDefault();
    const {
      target
    } = e;
    const imgDelete = target.closest('.item__delete');
    if (!imgDelete) return;
    const file = imgDelete.closest('.item');
    this.imageService.delete(file.dataset.id, () => {
      file.remove();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const widget = new ImageWidget('.app__container');
widget.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map