export class Notify {
  answer: number;
  details: {
    user: {
      firstName: string;
      lastName: string;
    }
  };
  id: number;
  isRead: number;
  logTime: Date;
  obj1: number;
  obj2: number;
  receiverID: number;
  senderID: number;
  type: string;

  constructor (notify) {
    notify = notify || {};

    this.answer = notify.answer || null;
    this.details = notify.details || {user: {firstName: '', lastName: ''}};
    this.id = notify.id || null;
    this.isRead = notify.isRead || null;
    this.logTime = notify.logTime ? new Date(notify.logTime) : null;
    this.obj1 = notify.obj1 || null;
    this.obj2 = notify.obj2 || null;
    this.receiverID = notify.receiverID || null;
    this.senderID = notify.senderID || null;
    this.type = notify.type || '';
  }
}
