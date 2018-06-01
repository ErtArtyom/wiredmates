import { Component } from '@angular/core';
import { Events, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { Card } from '../../models/card';
import { RequestData } from '../../models/request-data';
import { GlobalProvider } from '../../providers/global/global';
import { MessagesRoomPage } from '../messages-room/messages-room';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MatesSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mates-search',
  templateUrl: 'mates-search.html',
})
export class MatesSearchPage {
  public user: User;
  public card: Card;
  public searchQuery: string;
  public cards: Card[];
  public alphas: string[];

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private events: Events,
               private callNumber: CallNumber,
               private launchNavigator: LaunchNavigator,
               private platform: Platform,
               private loadingCtrl: LoadingController) {
    this.user = this.auth.user;
    this.card = User.defaultCard(this.user);
    this.searchQuery = this.navParams.data.searchQuery || '';
    this.searchMates();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MatesSearchPage');

    this.events.subscribe('mate:recommend', (card: Card) => {
      this.navCtrl.push(ProfilePage, {
        card: card
      });
    });

    this.events.subscribe('mate:navigate', (card: Card) => {
      let options: LaunchNavigatorOptions = {
        start: 'London, ON',
        app: this.launchNavigator.APP.GOOGLE_MAPS
      };

      this.platform.ready().then(() => {
        this.launchNavigator.navigate('Toronto, ON', options)
          .then(success => alert('Launched navigator'),
            error => alert(error));
      });
    });

    this.events.subscribe('mate:call', (card: Card) => {
      this.callNumber.callNumber('18001010101', true)
        .then(res => alert(res))
        .catch(err => alert(err));
    });

    this.events.subscribe('mate:message', (card: Card) => {
      this.navCtrl.push(MessagesRoomPage, {
        toUserId: card.userID
      });
    });
  }

  /**
   * Search mates by searchQuery
   */
  searchMates (): void {
    if (this.searchQuery && this.searchQuery.trim().length > 2) {
      this.findProfile();
    }
  }

  /**
   * Reset mates
   */
  clearMates (): void {
    this.cards = [];
  }

  /**
   * Get mates by search query
   */
  findProfile (): void {
    this.auth.findProfile({
      key: this.searchQuery,
      type: 'not b'
    })
      .subscribe((data: RequestData) => {
        if (data) {
          this.cards = data.cards
            .map(card => new Card(card))
            .sort((a, b) => a.firstName == b.firstName ? 0 : +(a.firstName > b.firstName) || -1);

          this.alphas = GlobalProvider.createAlphas(this.cards);
        }
      });
  }

  /**
   * Add mate by id
   * @param {Card} card
   */
  cardRequest (card: Card): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.cardRequest({
      id: card.id,
      profileID: this.card.id
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          Card.add(card);
        }
      });
  }

  /**
   * Open action sheet
   * @param {Card} card
   */
  toggleMate (card: Card = undefined): void {
    this.events.publish('mate:activated', card);
  }
}
