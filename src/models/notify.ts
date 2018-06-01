import { Details } from './details';

export class Notify {
  answer: number;
  details: Details;
  id: number;
  readTime: Date | number;
  logTime: Date | number;
  obj1: number;
  obj2: number;
  receiverID: number;
  senderID: number;
  type: string;

  constructor (notify) {
    notify = notify || {};

    this.answer = notify.answer || null;
    this.details = new Details(notify.details);
    this.id = notify.id || null;
    this.readTime = notify.readTime ? new Date(notify.readTime * 1000) : 0;
    this.logTime = notify.logTime ? new Date(notify.logTime * 1000) : 0;
    this.obj1 = notify.obj1 || null;
    this.obj2 = notify.obj2 || null;
    this.receiverID = notify.receiverID || null;
    this.senderID = notify.senderID || null;
    this.type = notify.type || '';
  }

  static getNotifyMessage (type: string): string {
    return type;
  }
}
