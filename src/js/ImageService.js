import createRequest from './api/createRequest';
/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class ImageService {
  constructor() {
    this.URL = 'http://localhost:3000';
  }

  // Получить все файлы
  list(callback) {
    createRequest({
      url: `${this.URL}/files`,
      method: 'GET',
    }, callback);
  }

  // Получить один файл
  get(id, callback) {
    createRequest({
      url: `${this.URL}/files/${id}`,
      method: 'GET',
    }, callback);
  }

  // Создать файл
  create(data, callback) {
    createRequest({
      url: `${this.URL}/files`,
      method: 'POST',
      data,
    }, callback);
  }

  // Удалить файл
  delete(id, callback) {
    createRequest({
      url: `${this.URL}/files/${id}`,
      method: 'DELETE',
    }, callback);
  }
}
