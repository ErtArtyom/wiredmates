import { Component } from '@angular/core';
import { Events, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../../providers/auth/auth';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { GlobalProvider } from '../../providers/global/global';
import { MatesSearchPage } from '../mates-search/mates-search';
import { MessagesRoomPage } from '../messages-room/messages-room';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mates',
  templateUrl: 'mates.html',
})
export class MatesPage {
  public user: User;
  public searchQuery: string;
  public cards: Card[];
  public alphas: string[];

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private loadingCtrl: LoadingController,
               private events: Events) {
    this.user = this.auth.user;
    this.searchQuery = '';

    this.getMyCards();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MatesPage');

    this.events.subscribe('mate:recommend', (card: Card) => {
      this.navCtrl.push(ProfilePage, {
        card: card
      });
    });

    this.events.subscribe('mate:navigate', (card: Card) => {
      // let options: LaunchNavigatorOptions = {
      //   start: 'London, ON',
      //   app: this.launchNavigator.APP.GOOGLE_MAPS
      // };
      //
      // this.platform.ready().then(() => {
      //   this.launchNavigator.navigate('Toronto, ON', options)
      //     .then(success => alert('Launched navigator'),
      //       error => alert(error));
      // });
    });

    this.events.subscribe('mate:call', (card: Card) => {
      // this.callNumber.callNumber('18001010101', true)
      //   .then(res => alert(res))
      //   .catch(err => alert(err));
    });

    this.events.subscribe('mate:message', (card: Card) => {
      this.navCtrl.push(MessagesRoomPage, {
        toCard: card
      });
    });
  }

  /**
   * Search mates by searchQuery
   */
  searchMates (): void {
    if (this.searchQuery && this.searchQuery.trim().length > 2) {
      this.cards = this.cards
        .filter(card => card.firstName.trim()
          .toLowerCase()
          .search(this.searchQuery.trim().toLowerCase()) !== -1);

      this.alphas = GlobalProvider.createAlphas(this.cards);
    }
  }

  /**
   * Set default mates from user object
   */
  setDefaultMates (): void {
    this.cards = this.user.cards;

    this.alphas = GlobalProvider.createAlphas(this.cards);
  }

  getMyCards (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.getMyCards()
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.user.cards = data.data.map(card => new Card(card));
          this.setDefaultMates();
        }
      });
  }

  /**
   * Go to MatesSearch page
   */
  matesSearch (): void {
    this.navCtrl.push(MatesSearchPage, {searchQuery: this.searchQuery});
  }

  /**
   * Open action sheet
   * @param {Card} card
   */
  toggleMate (card: Card = undefined): void {
    this.events.publish('mate:activated', card);
  }
}
