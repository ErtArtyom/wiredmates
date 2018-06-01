import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestData } from '../../models/request-data';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { MatesPage } from '../mates/mates';
import { MyProfilesPage } from '../my-profiles/my-profiles';
import { ProfilePage } from '../profile/profile';
import { AuthProvider } from '../../providers/auth/auth';

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
  public user: User;
  public isProfessional = User.isProfessional;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.auth.user;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad SettingsPage');
  }

  profile () {
    this.navCtrl.push(ProfilePage, {
      card: User.defaultCard(this.user),
      id: this.user.id
    });
  }

  profiles () {
    this.navCtrl.push(MyProfilesPage);
  }

  mates () {
    this.navCtrl.push(MatesPage);
  }

  wires () {

  }

  posts () {

  }

  dashboard () {

  }

  sharedInfo () {

  }

  changeEmail () {

  }

  changePassword () {

  }

  availability () {

  }

  appearanceRange () {

  }

  ignoreRecommendations () {

  }

  blockedProfiles () {

  }

  recallWiresCard () {

  }

  logOut () {
    this.auth.logOut()
      .subscribe((data: RequestData) => {
        if (data) {
          this.navCtrl.setRoot(LoginPage);

          this.auth.storeUserData();
        }
      });
  }
}
