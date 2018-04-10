import { Component } from '@angular/core';
import { ActionSheetController, InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RequestData } from '../../models/request-data';
import { Message } from '../../models/message';
import { MessagesRoomPage } from '../messages-room/messages-room';
import { User } from '../../models/user';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  public user: User;
  public messages: Message[];
  private lastID: number;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.auth.user;
    this.messages = [];
    this.lastID = 0;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MessagesPage');
  }

  ionViewWillEnter () {
    this.messages = [];
    this.lastID = 0;

    this.getMessages();
  }

  /**
   * Get messages
   * @param {boolean} more
   */
  getMessages (more: boolean = false): void {
    let lastID = null;
    if (more && this.lastID) {
      lastID = this.lastID;

      if (this.lastID === 0) {
        return;
      }
    }

    this.auth.getMessages(lastID)
      .subscribe((data: RequestData) => {
        if (data) {
          data.messages.map(msg => this.messages.push(new Message(msg)));
          this.lastID = data.lastID;
        }
      });
  }

  /**
   * Get more messages
   */
  moreMessages () {
    this.getMessages(true);
  }

  /**
   * Og to message room page
   * @param {Message} message
   */
  openMessage (message: Message): void {
    this.navCtrl.push(MessagesRoomPage, {
      toUserId: message.senderID === this.user.id ? message.receiverID : message.senderID,
      roomKey: message.roomKey
    });
  }
}
