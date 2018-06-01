export class Patent {
  id: number;
  title: string;
  office: string;
  number: string;
  dateIssued: string;
  description: string;
  inventorName: string;
  status: number;

  constructor (patent?) {
    patent = patent || {};

    this.id = patent.id || null;
    this.title = patent.title || '';
    this.office = patent.office || '';
    this.number = patent.number || '';
    this.dateIssued = patent.dateIssued || '';
    this.description = patent.description || '';
    this.inventorName = patent.inventorName || '';
    this.status = patent.status || 0;
  }
}
