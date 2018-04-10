import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.auth.user;

    this.getNotifications();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AlertsPage');
  }

  private getNotifications (id: number = null) {
    this.auth.getNotifications({
      id: id
    }).subscribe((data: RequestData) => {
      if (data) {
        this.notifications = data.notifications.map(notify => new Notify(notify));
      }
    });
  }

}
