export class Employment {
  id: number;
  title: string;
  employer: string;
  durationFrom: string;
  durationTo: string;

  constructor (employment?) {
    employment = employment || {};

    this.id = employment.id || null;
    this.title = employment.title || '';
    this.employer = employment.employer || '';
    this.durationFrom = employment.durationFrom || '';
    this.durationTo = employment.durationTo || '';
  }
}
