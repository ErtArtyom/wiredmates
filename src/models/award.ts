export class Award {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  url: string;

  constructor (award?) {
    award = award || {};

    this.id = award.id || null;
    this.name = award.name || '';
    this.issuer = award.issuer || '';
    this.issueDate = award.issueDate || '';
    this.url = award.url || '';
  }
}
