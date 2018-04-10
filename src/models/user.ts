import { Card } from './card';

export class User {
  cards: any[];
  contacts: any[];
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  level: number;
  middleName: string;
  notifications: any[];
  occupation: string;
  organization: string;
  phone: string;
  photo: string;
  settings: any;
  type: string;
  verified: number;
  address1: string;

  constructor (user) {
    user = user || {};

    this.cards = user.cards ? user.cards.map(card => new Card(card)) : [];
    this.contacts = user.contacts || [];
    this.email = user.email || '';
    this.firstName = user.firstName || '';
    this.id = user.id || null;
    this.lastName = user.lastName || '';
    this.level = user.level || null;
    this.middleName = user.middleName || '';
    this.notifications = user.notifications || [];
    this.occupation = user.occupation || '';
    this.organization = user.organization || '';
    this.phone = user.phone || '';
    this.photo = user.photo || '';
    this.settings = user.settings || {};
    this.type = user.type || '';
    this.verified = user.verified || null;
    this.address1 = user.address1 || '';
  }
}
