export default class File {
  constructor({ id, filename, path }) {
    this.id = id; // идентификатор (уникальный в пределах системы)
    this.name = filename; // имя файла
    this.path = path; // путь, по которому можно получить файл
  }
}
