export class Education {
  id: number;
  school: string;
  degree: string;
  gradYear: string;

  constructor (education?) {
    education = education || {};

    this.id = education.id || null;
    this.school = education.school || '';
    this.degree = education.degree || '';
    this.gradYear = education.gradYear || '';
  }
}
