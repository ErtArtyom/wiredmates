import { Details } from './details';

export class Menus {
  [name: string]: any[];
}

export class Recommend {
  all: number;
  mates: number;

  constructor (rec?) {
    rec = rec || {};

    this.all = rec.all || 0;
    this.mates = rec.mates || 0;
  }
}

export class CardRecommendations {
  count: Recommend;
  profiles: Details[];
  recBy1: Recommend;
  recBy2: Recommend;
  recBy3: Recommend;
  recBy4: Recommend;
  recBy5: Recommend;

  constructor (rec?) {
    rec = rec || {};

    this.count = rec.count || new Recommend();
    this.profiles = rec.profiles || [];
    this.recBy1 = rec.recBy1 || new Recommend();
    this.recBy2 = rec.recBy2 || new Recommend();
    this.recBy3 = rec.recBy3 || new Recommend();
    this.recBy4 = rec.recBy4 || new Recommend();
    this.recBy5 = rec.recBy5 || new Recommend();
  }
}

export class Card {
  about: string;
  aboutMode: boolean;
  active: number;
  add_email1: string;
  add_email1Mode: boolean;
  add_phone1: string;
  add_phone1Mode: boolean;
  add_phone2: string;
  add_phone2Mode: boolean;
  address1: string;
  address1Mode: boolean;
  address2: string;
  address2Mode: boolean;
  birthday: string;
  birthdayMode: boolean;
  city: string;
  country: string;
  email: string;
  emailMode: boolean;
  facebook: string;
  fax: string;
  faxMode: boolean;
  firstName: string;
  fullName: string;
  id: number;
  isDefault: boolean;
  lastName: string;
  level: number;
  linkedIn: string;
  logo: string;
  middleName: string;
  occupation: string;
  occupationKey: string;
  occupationMode: boolean;
  organization: string;
  organizationMode: boolean;
  phone: string;
  phoneMode: boolean;
  photo: string;
  photoType: string;
  position: string;
  positionMode: boolean;
  public: number;
  recommendations: number;
  regTime: number;
  requestSent: number;
  state: string;
  templateID: number;
  twitter: string;
  type: string;
  updateTime: number;
  userID: number;
  website: string;
  zip: number;
  inCards: number;
  menus: Menus;
  cardRecommendations: CardRecommendations;

  constructor (card?) {
    card = card || {};

    this.about = card.about || '';
    this.aboutMode = !!card.aboutMode;
    this.active = card.active || null;
    this.add_email1 = card.add_email1 || '';
    this.add_email1Mode = !!card.add_email1Mode;
    this.add_phone1 = card.add_phone1 || '';
    this.add_phone1Mode = !!card.add_phone1Mode;
    this.add_phone2 = card.add_phone2 || '';
    this.add_phone2Mode = !!card.add_phone2Mode;
    this.address1 = card.address1 || '';
    this.address1Mode = !!card.address1Mode;
    this.address2 = card.address2 || '';
    this.address2Mode = !!card.address2Mode;
    this.birthday = card.birthday || '';
    this.birthdayMode = !!card.birthdayMode;
    this.city = card.city || '';
    this.country = card.country || null;
    this.email = card.email || '';
    this.emailMode = !!card.emailMode;
    this.facebook = card.facebook || '';
    this.fax = card.fax || '';
    this.faxMode = card.faxMode;
    this.firstName = card.firstName || '';
    this.fullName = card.fullName || '';
    this.id = card.id || null;
    this.isDefault = !!card.isDefault;
    this.lastName = card.lastName || '';
    this.level = card.level || null;
    this.linkedIn = card.linkedIn || '';
    this.logo = card.logo || '';
    this.middleName = card.middleName || '';
    this.occupation = card.occupation || '';
    this.occupationKey = card.occupationKey || '';
    this.occupationMode = !!card.occupationMode;
    this.organization = card.organization || '';
    this.organizationMode = !!card.organizationMode;
    this.phone = card.phone || '';
    this.phoneMode = !!card.phoneMode;
    this.photo = card.photo || '';
    this.photoType = card.photoType || '';
    this.position = card.position || '';
    this.positionMode = !!card.positionMode;
    this.public = card.public || null;
    this.recommendations = card.recommendations || 0;
    this.regTime = card.regTime || null;
    this.requestSent = card.requestSent || null;
    this.state = card.state || '';
    this.templateID = card.templateID || null;
    this.twitter = card.twitter || '';
    this.type = card.type || '';
    this.updateTime = card.updateTime || null;
    this.userID = card.userID || null;
    this.website = card.website || '';
    this.zip = card.zip || null;
    this.inCards = card.inCards || 0;
    this.menus = card.menus || {};
    this.cardRecommendations = card.cardRecommendations || new CardRecommendations();
  }

  /**
   * Set card __added true
   * @param {Card} card
   */
  static add (card: Card): void {
    card.requestSent = 1;
  }

  /**
   * Unmask phone number
   * @param {string} phoneMask
   * @returns {string}
   */
  static unmaskPhone (phoneMask: string): string {
    return phoneMask.replace(/\D+/g, '');
  }

  /**
   * CHeck if user is mate
   * @param {Card} card
   * @returns {boolean}
   */
  public static isMate (card: Card): boolean {
    return card.type === 'm';
  }

  /**
   * Check if user is professional (wire)
   * @param {Card} card
   * @returns {boolean}
   */
  public static isProfessional (card: Card): boolean {
    return card.type === 'p';
  }
}
