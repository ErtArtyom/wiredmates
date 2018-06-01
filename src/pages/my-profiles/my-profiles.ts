import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { Card } from '../../models/card';
import { RequestData } from '../../models/request-data';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileEditPage } from '../profile-edit/profile-edit';

/**
 * Generated class for the MyProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profiles',
  templateUrl: 'my-profiles.html',
})
export class MyProfilesPage {
  @ViewChild(Slides) slides: Slides;

  public user: User;
  public sliderHeight: number;

  public cards: Card[];

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private platform: Platform,
               private auth: AuthProvider,
               private loadingCtrl: LoadingController) {
    this.user = this.auth.user;
    this.cards = this.auth.user.contacts;

    //TODO update my contacts

    platform.ready().then(() => {
      this.sliderHeight = platform.height() - 172 + 54;

      this.slides.direction = 'vertical';
      this.slides.spaceBetween = 40;
      this.slides.slidesPerView = 'auto';
      this.slides.keyboardControl = true;
      this.slides.preventClicks = false;
      this.slides.preventClicksPropagation = false;
    });
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MyProfilesPage');
  }

  /**
   * Change default profile
   * @param {Card} card
   */
  makeDefault (card: Card): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.changeDefaultProfile({
      id: card.id
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.cards.map((_card: Card) => {
            _card.isDefault = card.id === _card.id;
          });

          this.user.contacts = this.cards;
          this.auth.storeUserData(this.auth.token, this.user);
        }
      });
  }

  /**
   * Add new profile
   */
  addProfile (): void {
    this.navCtrl.push(ProfileEditPage, {
      card: new Card(),
      callback () {
        return new Promise(resolve => {
          this.user = this.auth.user;
          this.cards = this.user.contents;

          resolve();
        });
      }
    });
  }
}
