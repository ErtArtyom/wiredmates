export class Publication {
  id: number;
  title: string;
  publisherName: string;
  datePublished: string;
  coAuthors: string;
  url: string;
  description: string;

  constructor (publication?) {
    publication = publication || {};

    this.id = publication.id || null;
    this.title = publication.title || '';
    this.publisherName = publication.publisherName || '';
    this.datePublished = publication.datePublished || '';
    this.coAuthors = publication.coAuthors || '';
    this.url = publication.url || '';
    this.description = publication.description || '';
  }
}
