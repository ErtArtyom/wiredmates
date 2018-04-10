import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Card } from '../../models/card';
import { RequestData } from '../../models/request-data';
import { MessagesRoomPage } from '../messages-room/messages-room';
import { CallNumber } from '@ionic-native/call-number';

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
  public searchQuery: string;
  public cards: Card[];

  private listHeaderChar: string;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private events: Events,
               private callNumber: CallNumber) {
    this.searchQuery = this.navParams.data.searchQuery || 'test';
    this.listHeaderChar = '';

    this.searchMates();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MatesSearchPage');

    this.events.subscribe('mate:recommend', (card: Card) => {
      // console.log(card);
    });

    this.events.subscribe('mate:navigate', (card: Card) => {
      // console.log(card);
    });

    this.events.subscribe('mate:call', (card: Card) => {
      console.log(card);

      this.callNumber.callNumber('18001010101', true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
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
      this.getMates();
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
  getMates (): void {
    this.auth.getMates(this.searchQuery)
      .subscribe((data: RequestData) => {
        if (data) {
          this.cards = data.cards
            .map(card => new Card(card))
            .sort((a, b) => a.firstName == b.firstName ? 0 : +(a.firstName > b.firstName) || -1);
        }
      });
  }

  /**
   * Add mate by id
   * @param {Card} card
   */
  addMate (card: Card): void {
    this.auth.addMate(card.id)
      .subscribe((data: RequestData) => {
        if (data) {
          Card.add(card);
        }
      });
  }

  /**
   * Get list header character by ordered card name
   * @param {Card} card
   * @returns {string}
   */
  cardAlpha (card: Card): string {
    let char = card.firstName.charAt(0).toUpperCase(); // Get uppercase first character from card name

    if (this.listHeaderChar !== char) { // check if last character equal new current character
      this.listHeaderChar = char;

      return char; // return new character
    }

    return null; // otherwise return null
  }

  toggleMate (card: Card = undefined): void {
    this.events.publish('mate:activated', card);
  }
}
