import { Details } from './details';

export class Message {
  id: number;
  details: Details[];
  message: string;
  logTime: Date | number;
  readTime: Date | number;
  roomKey: string;
  receiverID: number;
  receiverProfileID: number;
  senderID: number;
  senderProfileID: number;
  status: string;

  constructor (msg?) {
    msg = msg || {};

    this.id = msg.id || Message.id();
    this.details = msg.details ? msg.details.map(detail => new Details(detail)) : [];
    this.message = msg.message || '';
    this.logTime = msg.logTime ? new Date(msg.logTime * 1000) : new Date();
    this.readTime = msg.readTime ? new Date(msg.readTime * 1000) : 0;
    this.roomKey = msg.roomKey || '';
    this.receiverID = msg.receiverID || null;
    this.receiverProfileID = msg.receiverProfileID || null;
    this.senderID = msg.senderID || null;
    this.senderProfileID = msg.senderProfileID || null;
    this.status = msg.status || 'success';
  }

  /**
   * Generate random unique id
   * @returns {number}
   */
  static id (): number {
    return Math.floor(Math.random() * 100 * 100) + 1;
  }

  /**
   * Get Message Details
   * @param {Message} message
   * @param {Details} card
   * @param {Details} toCard
   * @returns {Details}
   */
  static details (message: Message, card: Details = new Details(), toCard: Details = new Details()): Details {
    if (message.details.length) {
      return message.details[0];
    }

    if (message.senderProfileID === card.id) {
      return card;
    } else {
      return toCard;
    }
  }
}
