export class Engagement {
  id: number;
  organizationName: string;
  eventName: string;
  year: string;
  url: string;

  constructor (engagement?) {
    engagement = engagement || {};

    this.id = engagement.id || null;
    this.organizationName = engagement.organizationName || '';
    this.eventName = engagement.eventName || '';
    this.year = engagement.year || '';
    this.url = engagement.url || '';
  }
}
