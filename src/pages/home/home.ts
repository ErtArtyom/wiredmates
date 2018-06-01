import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { MatesPage } from '../mates/mates';
import { MatesSearchPage } from '../mates-search/mates-search';
import { MyProfilesPage } from '../my-profiles/my-profiles';
import { ProfilePage } from '../profile/profile';
import { WiresPage } from '../wires/wires';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: User;
  public card: Card;

  public isProfessional = User.isProfessional;
  public isMate = User.isMate;

  constructor (public navCtrl: NavController,
               private auth: AuthProvider) {
    this.user = auth.user;
    this.card = User.defaultCard(this.user);

    console.log(this.user, this.card);
  }

  goProfile () {
    this.navCtrl.push(ProfilePage, {
      card: User.defaultCard(this.user),
      id: this.user.id
    });
  }

  exchange () {

  }

  addMate () {
    this.navCtrl.push(MatesSearchPage);
  }

  myWires () {
    this.navCtrl.push(WiresPage);
  }

  myMates () {
    this.navCtrl.push(MatesPage);
  }

  myProfiles () {
    this.navCtrl.push(MyProfilesPage);
  }

  inbox () {

  }

  createCard () {

  }
}
