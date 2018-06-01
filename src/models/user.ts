import { Card } from './card';

export class User {
  cards: Card[];
  contacts: Card[];
  email: string;
  id: number;
  level: number;
  notifications: number;
  occupation: string;
  organization: string;
  phone: string;
  photo: string;
  settings: any;
  type: string;
  verified: number;
  address1: string;
  recommendationsByMe: any;
  recommendationsByMates: any;
  recommendationsForMe: any;

  constructor (user) {
    user = user || {};

    this.cards = user.cards ? user.cards.map(card => new Card(card)) : [];
    this.contacts = user.contacts ? user.contacts.map(contact => new Card(contact)) : [];
    this.email = user.email || '';
    this.id = user.id || null;
    this.level = user.level || null;
    this.notifications = user.notifications || 0;
    this.occupation = user.occupation || '';
    this.organization = user.organization || '';
    this.phone = user.phone || '';
    this.photo = user.photo || '';
    this.settings = user.settings || {};
    this.type = user.type || '';
    this.verified = user.verified || null;
    this.address1 = user.address1 || '';
    this.recommendationsByMe = user.recommendationsByMe || {};
    this.recommendationsByMates = user.recommendationsByMates || {};
    this.recommendationsForMe = user.recommendationsForMe || {};
  }

  /**
   * CHeck if user is mate
   * @param {User} user
   * @returns {boolean}
   */
  public static isMate (user: User): boolean {
    return user.type === 'm';
  }

  /**
   * Check if user is professional (wire)
   * @param {User} user
   * @returns {boolean}
   */
  public static isProfessional (user: User): boolean {
    return user.type === 'p';
  }

  /**
   * Get Default Card
   * @param {User} user
   * @returns {Card}
   */
  public static defaultCard (user: User): Card {
    return user.contacts.filter((card: Card) => card.isDefault)[0];
  }
}
