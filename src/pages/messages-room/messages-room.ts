import { Component, ElementRef, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { RequestData } from '../../models/request-data';
import { Message } from '../../models/message';

/**
 * Generated class for the MessagesRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages-room',
  templateUrl: 'messages-room.html',
})
export class MessagesRoomPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;

  public user: User;
  public toUserId: number;
  public roomKey: string;
  public messages: Message[] = [];
  public message: string = '';
  private lastID: number;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.auth.user;
    this.toUserId = this.navParams.data.toUserId;
    this.roomKey = this.navParams.data.roomKey;

    this.getMessages();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MessagesRoomPage');
  }

  onFocus () {
    this.content.resize();
  }

  /**
   * Get room messages by roomKey
   * @param {boolean} more
   */
  getMessages (more: boolean = false): void {
    let lastID = null;
    if (more) {
      lastID = this.lastID;
    }

    this.auth.getMessages(lastID, this.roomKey)
      .subscribe((data: RequestData) => {
        if (data) {
          data.messages.map(msg => this.messages.unshift(new Message(msg)));
          this.lastID = data.lastID;
        }
      });
  }

  /**
   * Get last messages
   */
  lastMessages () {
    this.getMessages(true);
  }

  /**
   * Send message
   */
  sendMsg (): void {
    if (this.message && this.message.trim()) {
      let id = Message.id();
      let msg = new Message({
        id: id,
        receiverID: this.toUserId,
        senderID: this.user.id,
        message: this.message,
        status: 'pending'
      });

      this.messages.push(msg);
      this.scrollToBottom();
      this.message = '';

      this.auth.sendMessage(msg)
        .subscribe((data: RequestData) => {
          if (data) {
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
              this.messages[index].status = 'success';
            }
          }
        });
    }
  }

  /**
   * Get message index by message id
   * @param {string} id
   * @returns {number}
   */
  getMsgIndexById (id: number): number {
    return this.messages.findIndex((message: Message) => message.id === id);
  }

  /**
   * Scroll message content to bottom
   */
  scrollToBottom (): void {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }
}
