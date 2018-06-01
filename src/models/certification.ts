export class Certification {
  id: number;
  name: string;
  authority: string;
  number: string;
  validUntil: string;

  constructor (certification?) {
    certification = certification || {};

    this.id = certification.id || null;
    this.name = certification.name || '';
    this.authority = certification.authority || '';
    this.number = certification.number || '';
    this.validUntil = certification.validUntil || '';
  }
}
