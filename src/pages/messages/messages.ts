import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Card } from '../../models/card';
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
  public details = Message.details;

  public user: User;
  private card: Card;
  public messages: Message[];
  public messagesGroup: Message[] = [];
  private lastID: number;
  public more: number;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private toast: ToastController,
               private loadingCtrl: LoadingController) {
    this.user = this.auth.user;
    this.card = User.defaultCard(this.user);
    this.messages = [];
    this.lastID = 0;
    this.more = 0;
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let lastID = null;
    if (more) {
      lastID = this.lastID;
    }

    this.auth.getMessages({
      id: lastID,
      profileID: this.card.id
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          data.messages.map(msg => this.messages.push(new Message(msg)));
          this.lastID = data.lastID;
          this.more = data.more;

          this.groupMessages();

          if (data.d) {
            this.toast.create({
              message: data.d,
              duration: 3000,
              position: 'top'
            }).present();
          }
        }
      });
  }

  /**
   * Group messages
   */
  private groupMessages (): void {
    const flags: string[] = [], messagesGroup: Message[] = [];

    for (let i = 0; i < this.messages.length; i++) {
      if (flags[this.messages[i].roomKey]) {
        continue;
      }

      flags[this.messages[i].roomKey] = true;
      messagesGroup.push(this.messages[i]);
    }

    this.messagesGroup = messagesGroup;
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
      toCard: Message.details(message),
      roomKey: message.roomKey
    });
  }
}
