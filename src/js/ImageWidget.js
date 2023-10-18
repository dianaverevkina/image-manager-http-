import ImageView from './ImageView';
import ImageService from './ImageService';
import File from './File';

export default class ImageWidget {
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
    this.imageService.list((response) => {
      if (response) {
        response.files.forEach((img) => {
          const file = new File(img);
          const fileEl = ImageView.renderImgElement(file);
          this.imagesContainer.append(fileEl);
        });
      }
    });
  }

  // Добавляем обработчики событий
  addEvents() {
    this.fileContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.containerContent.classList.add('file-container__content_hovered');
    });

    this.fileContainer.addEventListener('dragleave', () => {
      this.containerContent.classList.remove('file-container__content_hovered');
    });

    this.fileContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      this.containerContent.classList.remove('file-container__content_hovered');
      const { files } = e.dataTransfer;
      [...files].forEach((file) => this.createImageFile(file));
    });

    this.btnAddFile.addEventListener('click', (e) => {
      e.preventDefault();

      this.input.value = '';
      this.input.dispatchEvent(new MouseEvent('click'));
    });

    this.input.addEventListener('change', () => {
      const { files } = this.input;
      if (files.length === 0) return;
      [...files].forEach((file) => this.createImageFile(file));
    });

    this.imagesContainer.addEventListener('click', (e) => this.deleteImg(e));
  }

  // Создаем картинку
  createImageFile(img) {
    const formData = new FormData();
    formData.append('file', img);

    this.imageService.create(formData, (response) => {
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
    const { target } = e;
    const imgDelete = target.closest('.item__delete');

    if (!imgDelete) return;

    const file = imgDelete.closest('.item');
    this.imageService.delete(file.dataset.id, () => {
      file.remove();
    });
  }
}
