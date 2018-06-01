export class Reference {
  id: number;
  name: string;
  contactInformation: string;

  constructor (reference?) {
    reference = reference || {};

    this.id = reference.id || null;
    this.name = reference.name || '';
    this.contactInformation = reference.contactInformation || '';
  }
}
