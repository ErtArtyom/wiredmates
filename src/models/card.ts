export class Card {
  about: string;
  aboutMode: number;
  active: number;
  add_email1: string;
  add_email1Mode: number;
  add_phone1: string;
  add_phone1Mode: number;
  add_phone2: string;
  add_phone2Mode: number;
  address1: string;
  address1Mode: number;
  address2: string;
  address2Mode: number;
  birthday: string;
  birthdayMode: number;
  city: string;
  country: string;
  email: string;
  emailMode: number;
  facebook: string;
  fax: string;
  faxMode: number;
  firstName: string;
  fullName: string;
  id: number;
  isDefault: number;
  lastName: string;
  level: number;
  linkedIn: string;
  logo: string;
  middleName: string;
  occupation: string;
  occupationKey: string;
  occupationMode: number;
  organization: string;
  organizationMode: number;
  phone: string;
  phoneMode: number;
  photo: string;
  position: string;
  positionMode: number;
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
  __added: boolean;

  constructor (card) {
    card = card || {};

    this.about = card.about || '';
    this.aboutMode = card.aboutMode || null;
    this.active = card.active || null;
    this.add_email1 = card.add_email1 || '';
    this.add_email1Mode = card.add_email1Mode || null;
    this.add_phone1 = card.add_phone1 || '';
    this.add_phone1Mode = card.add_phone1Mode || null;
    this.add_phone2 = card.add_phone2 || '';
    this.add_phone2Mode = card.add_phone2Mode || null;
    this.address1 = card.address1 || '';
    this.address1Mode = card.address1Mode || null;
    this.address2 = card.address2 || '';
    this.address2Mode = card.address2Mode || null;
    this.birthday = card.birthday || '';
    this.birthdayMode = card.birthdayMode || null;
    this.city = card.city || '';
    this.country = card.country || null;
    this.email = card.email || '';
    this.emailMode = card.emailMode || null;
    this.facebook = card.facebook || '';
    this.fax = card.fax || '';
    this.faxMode = card.faxMode || null;
    this.firstName = card.firstName || '';
    this.fullName = card.fullName || '';
    this.id = card.id || null;
    this.isDefault = card.isDefault || null;
    this.lastName = card.lastName || '';
    this.level = card.level || null;
    this.linkedIn = card.linkedIn || '';
    this.logo = card.logo || '';
    this.middleName = card.middleName || '';
    this.occupation = card.occupation || '';
    this.occupationKey = card.occupationKey || '';
    this.occupationMode = card.occupationMode || null;
    this.organization = card.organization || '';
    this.organizationMode = card.organizationMode || null;
    this.phone = card.phone || '';
    this.phoneMode = card.phoneMode || null;
    this.photo = card.photo || '';
    this.position = card.position || '';
    this.positionMode = card.positionMode || null;
    this.public = card.public || null;
    this.recommendations = card.recommendations || null;
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
    this.__added = false;
  }

  /**
   * Set card __added true
   * @param {Card} card
   */
  static add (card: Card): void {
    card.__added = true;
  }
}
