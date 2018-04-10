export class Message {
  id: number;
  receiverID: number;
  message: string;
  logTime: Date | number;
  readTime: Date | number;
  roomKey: string;
  senderID: number;
  status: string;

  constructor (msg) {
    msg = msg || {};

    this.id = msg.id || Message.id();
    this.receiverID = msg.receiverID || null;
    this.message = msg.message || '';
    this.logTime = msg.logTime ? new Date(msg.logTime) : 0;
    this.readTime = msg.readTime ? new Date(msg.readTime) : 0;
    this.roomKey = msg.roomKey || '';
    this.senderID = msg.senderID || null;
    this.status = msg.status || 'success';
  }

  /**
   * Generate random unique id
   * @returns {number}
   */
  static id (): number {
    return Math.floor(Math.random() * 100 * 100) + 1;
  }
}
