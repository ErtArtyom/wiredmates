export class Details {
  id: number;
  userID: number;
  firstName: string;
  lastName: string;
  middleName: string;
  photo: string;
  photoType: string;

  constructor (detail?) {
    detail = detail || {};

    this.id = detail.id || null;
    this.userID = detail.userID || null;
    this.firstName = detail.firstName || '';
    this.lastName = detail.lastName || '';
    this.middleName = detail.middleName || '';
    this.photo = detail.photo || '';
    this.photoType = detail.photoType || '';
  }
}
