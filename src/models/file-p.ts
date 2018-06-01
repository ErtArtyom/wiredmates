export class FileP {
  id: number;
  title: string;
  file: string;
  type: string;

  constructor (file?) {
    file = file || {};

    this.id = file.id || null;
    this.title = file.title || '';
    this.file = file.file || '';
    this.type = file.type || '';
  }
}
