import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Content,
  InfiniteScroll,
  NavController,
  NavParams,
  ScrollEvent
} from 'ionic-angular';
import { Card } from '../../models/card';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { RequestData } from '../../models/request-data';
import { Message } from '../../models/message';
import * as moment from 'moment';

/**
 * Generated class for the MessagesRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages-room',
  templateUrl: 'messages-room.html'
})
export class MessagesRoomPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;

  public details = Message.details;

  public card: Card;
  public toCard: Card;
  public messages: Message[] = [];
  public showMessages: boolean = false;
  public message: string = '';
  private readonly roomKey: number;
  private lastID: number;
  public messagesTime: Date | number;
  public messagesTimeShow: boolean = false;
  private messagesTimeTimeout: any;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private el: ElementRef) {
    this.card = User.defaultCard(this.auth.user);
    this.toCard = this.navParams.data.toCard;
    this.roomKey = this.navParams.data.roomKey;

    this.getMessages();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MessagesRoomPage');
  }

  /**
   * Get room messages by roomKey
   * @param {boolean} more
   * @param infiniteScroll
   */
  getMessages (more: boolean = false, infiniteScroll: InfiniteScroll = null): void {
    let lastID = null;
    if (more) {
      lastID = this.lastID;
    }

    this.auth.getMessages({
      id: lastID,
      receiverProfileID: this.toCard.id,
      senderProfileID: this.card.id
    })
      .subscribe((data: RequestData) => {
        if (data) {
          data.messages.map(message => this.messages.unshift(new Message(message)));
          this.lastID = data.lastID;

          if (infiniteScroll) {
            if (data.more) {
              infiniteScroll.complete();
            } else {
              infiniteScroll.enable(false);
            }
          } else {
            this.scrollToBottom(0);

            setTimeout(() => {
              this.showMessages = true;
            }, 1000);
          }
        }
      });
  }

  /**
   * Send message
   */
  sendMessage (): void {
    if (this.message && this.message.trim()) {
      let id = Message.id();
      let message = new Message({
        id: id,
        receiverProfileID: this.toCard.id,
        senderProfileID: this.card.id,
        message: this.message,
        roomKey: this.roomKey,
        status: 'pending'
      });

      this.messages.push(message);
      this.scrollToBottom(0);
      this.message = '';

      this.auth.sendMessage(message)
        .subscribe((data: RequestData) => {
          if (data) {
            let index = this.getMessageIndexById(id);
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
  getMessageIndexById (id: number): number {
    return this.messages.findIndex((message: Message) => message.id === id);
  }

  /**
   * Scroll message content to bottom
   */
  scrollToBottom (time: number = 400): void {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, time);
  }

  /**
   * Do Infinite scroll and get more data
   * @param {InfiniteScroll} infiniteScroll
   */
  doInfinite (infiniteScroll: InfiniteScroll): void {
    this.getMessages(true, infiniteScroll);
  }

  isSomeDay (message: Message, previewsMessage: Message): boolean {
    if (!previewsMessage) {
      return false;
    }

    return moment(message.logTime).isSame(previewsMessage.logTime, 'day');
  }

  onScroll (event: ScrollEvent) {
    // const $messages = this.el.nativeElement.getElementsByClassName('message');
    // const $messagesWrapHeight = this.el.nativeElement.getElementsByClassName('message-wrap')[0].clientHeight;
    // let messageId: number;

    // for (let i = 0; i < $messages.length; i++) {
    //   if ($messages[i].offsetTop + $messages[i].offsetHeight > event.scrollTop) {
    //     messageId = Number($messages[i].id);
    //
    //     break;
    //   }
    // }

    // this.messagesTime = this.messages.find((message: Message) => message.id === messageId).logTime;
    // this.toggleMessagesTime($messagesWrapHeight - event.scrollTop - event.scrollHeight > 0);
  }

  // toggleMessagesTime (show: boolean) {
  //   clearTimeout(this.messagesTimeTimeout);
  //
  //   this.messagesTimeTimeout = setTimeout(() => {
  //     this.messagesTimeShow = show;
  //   }, 300);
  // }
}
