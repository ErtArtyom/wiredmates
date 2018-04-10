import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: User;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.auth.user;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SettingsPage');
  }

  profile () {
    this.navCtrl.push(ProfilePage, {user: this.user});
  }

  changeEmail () {

  }

  changePassword () {

  }

  myRecommendations () {

  }

  myFiles () {

  }

  myCards () {

  }

  myPosts () {

  }

  recommendedBy () {

  }

  visibility () {

  }

  blockedContacts () {

  }

  ignoredContacts () {

  }


}
