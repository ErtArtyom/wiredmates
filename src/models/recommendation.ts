export class Recommendation {
  id: number;
  contactID: number;
  recBy1: string;
  recBy2: string;
  recBy3: string;
  recBy4: string;
  recBy5: string;

  constructor (recommendation?) {
    recommendation = recommendation || {};

    this.id = recommendation.id || null;
    this.contactID = recommendation.contactID || null;
    this.recBy1 = recommendation.recBy1 || '';
    this.recBy2 = recommendation.recBy2 || '';
    this.recBy3 = recommendation.recBy3 || '';
    this.recBy4 = recommendation.recBy4 || '';
    this.recBy5 = recommendation.recBy5 || '';
  }
}
