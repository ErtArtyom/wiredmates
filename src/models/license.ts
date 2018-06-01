export class License {
  id: number;
  name: string;
  authority: string;
  durationTo: string;

  constructor (license?) {
    license = license || {};

    this.id = license.id || null;
    this.name = license.name || '';
    this.authority = license.authority || '';
    this.durationTo = license.durationTo || '';
  }
}
