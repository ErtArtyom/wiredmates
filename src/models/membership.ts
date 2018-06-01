export class Membership {
  id: number;
  name: string;
  position: string;
  durationFrom: string;
  durationTo: string;

  constructor (membership?) {
    membership = membership || {};

    this.id = membership.id || null;
    this.name = membership.name || '';
    this.position = membership.position || '';
    this.durationFrom = membership.durationFrom || '';
    this.durationTo = membership.durationTo || '';
  }
}
