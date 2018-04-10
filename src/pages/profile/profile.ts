import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { User } from '../../models/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public user: User;
  public isMyProfile: boolean;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.navParams.data.user;
    this.isMyProfile = this.user.id === this.auth.user.id;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfilePage');
  }

  edit () {
    this.navCtrl.push(ProfileEditPage, {user: this.user});
  }
}
