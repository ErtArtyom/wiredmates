import { Component } from '@angular/core';
import {
  AlertController,
  InfiniteScroll,
  ItemSliding,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import { Message } from '../../models/message';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { RequestData } from '../../models/request-data';
import { Notify } from '../../models/notify';

/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {
  public user: User;
  public notifications: Notify[];
  private lastID: number;

  public getNotifyMessage: Function = Notify.getNotifyMessage;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController) {
    this.user = this.auth.user;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AlertsPage');
  }

  ionViewWillEnter () {
    this.notifications = [];

    this.getMyNotifications();
  }

  /**
   * Get Notifications
   * @param {boolean} more
   * @param {InfiniteScroll} infiniteScroll
   */
  private getMyNotifications (more: boolean = false, infiniteScroll: InfiniteScroll = null): void {
    let lastID = null;
    if (more) {
      lastID = this.lastID;
    }

    this.auth.getMyNotifications({
      id: lastID
    }).subscribe((data: RequestData) => {
      if (data) {
        data.data.map(notify => this.notifications.push(new Notify(notify)));
        this.lastID = data.lastID;

        if (infiniteScroll) {
          if (data.more) {
            infiniteScroll.complete();
          } else {
            infiniteScroll.enable(false);
          }
        }
      }
    });
  }

  /**
   * Open notification alert
   * @param {Notify} notify
   */
  openNotify (notify: Notify): void {
    if (notify.type === 'cardRequest') {
      if (notify.answer) {
        this.alertCtrl.create({
          title: 'Card Request',
          subTitle: 'cardRequest',
          buttons: ['Ok']
        }).present();
      } else {
        this.alertCtrl.create({
          title: 'Card Request',
          subTitle: 'cardRequest',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {
                this.answerOnCardRequest(-1, notify);
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                this.answerOnCardRequest(1, notify);
              }
            },
            {
              text: 'Confirm & add to my Wires',
              handler: () => {
                this.answerOnCardRequest(1, notify, 1);
              }
            }
          ]
        }).present();
      }
    } else if (notify.type === 'cardRequestAccepted') {
      this.alertCtrl.create({
        title: 'Card Request Accepted',
        subTitle: 'cardRequestAccepted',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if (!notify.readTime) {
                this.markMyNotificationsAs(notify);
              }
            }
          }
        ]
      }).present();
    } else if (notify.type === 'deleteFromMyCards') {
      this.alertCtrl.create({
        title: 'Delete From My Cards',
        subTitle: 'deleteFromMyCards',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if (!notify.readTime) {
                this.markMyNotificationsAs(notify);
              }
            }
          }
        ]
      }).present();
    } else if (notify.type === 'newRecommendation') {
      this.alertCtrl.create({
        title: 'New Recommendation',
        subTitle: 'newRecommendation',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if (!notify.readTime) {
                this.markMyNotificationsAs(notify);
              }
            }
          }
        ]
      }).present();
    } else if (notify.type === 'removeRecommendation') {
      this.alertCtrl.create({
        title: 'Remove Recommendation',
        subTitle: 'removeRecommendation',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if (!notify.readTime) {
                this.markMyNotificationsAs(notify);
              }
            }
          }
        ]
      }).present();
    } else if (notify.type === 'updateRecommendation') {
      this.alertCtrl.create({
        title: 'Update Recommendation',
        subTitle: 'updateRecommendation',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if (!notify.readTime) {
                this.markMyNotificationsAs(notify);
              }
            }
          }
        ]
      }).present();
    }
  }

  /**
   * Answer on card request
   * @param {number} answer
   * @param {Notify} notify
   * @param {number} addToMyWires
   */
  private answerOnCardRequest (answer: number, notify: Notify, addToMyWires: number = 0): void {
    this.auth.answerOnCardRequest({
      answer: answer,
      id: notify.id,
      addToMyWires: addToMyWires
    })
      .subscribe((data: RequestData) => {
        if (data) {
          this.notifications.map((_notify: Notify) => {
            if (_notify.id === notify.id) {
              notify.readTime = new Date();
              this.user.notifications--;
              this.auth.storeUserData(this.auth.token, this.auth.user);
            }
          });
        }
      });
  }

  /**
   * Mark My Notifications as "read" or "unread"
   * @param {Notify} notify
   * @param {number} unread
   * @param {ItemSliding} item
   */
  markMyNotificationsAs (notify: Notify, unread: number = null, item: ItemSliding = null) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.markMyNotificationsAs({
      ids: [notify.id],
      unread: unread
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (item) {
          item.close();
        }

        if (data) {
          this.notifications.map((_notify: Notify) => {
            if (_notify.id === notify.id) {

              if (unread) {
                _notify.readTime = 0;

                this.user.notifications++;
              } else {
                _notify.readTime = new Date();

                this.user.notifications--;
              }

              this.auth.storeUserData(this.auth.token, this.auth.user);
            }
          });
        }
      });
  }

  /**
   * Unread notification
   * @param {ItemSliding} item
   * @param {Notify} notify
   */
  unreadNotify (item: ItemSliding, notify: Notify): void {
    this.markMyNotificationsAs(notify, 1, item);
  }

  /**
   * Delete Notification
   * @param {ItemSliding} item
   * @param {Notify} notify
   */
  deleteNotify (item: ItemSliding, notify: Notify) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.deleteMyNotifications({
      ids: [notify.id]
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();
        item.close();

        if (data) {
          this.notifications = this.notifications.filter((_notify: Notify) => _notify.id !== notify.id);
        }
      });
  }

  /**
   * Do Infinite scroll and get more data
   * @param {InfiniteScroll} infiniteScroll
   */
  doInfinite (infiniteScroll: InfiniteScroll): void {
    this.getMyNotifications(true, infiniteScroll);
  }
}
