import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { MatesSearchPage } from '../mates-search/mates-search';

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

  private listHeaderChar: string;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider) {
    this.user = this.auth.user;
    this.searchQuery = '';
    this.listHeaderChar = '';

    this.setDefaultMates();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MatesPage');
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
    }
  }

  /**
   * Set default mates from user object
   */
  setDefaultMates (): void {
    this.cards = this.user.cards;
  }

  /**
   * Go to MatesSearch page
   */
  matesSearch (): void {
    this.navCtrl.push(MatesSearchPage, {searchQuery: this.searchQuery});
  }

  /**
   * Get list header character by ordered card firstName
   * @param {Card} card
   * @returns {string}
   */
  cardAlpha (card: Card): string {
    let char = card.firstName.charAt(0).toUpperCase(); // Get uppercase first character from card firstName

    if (this.listHeaderChar !== char) {// check if last character equal new current character
      this.listHeaderChar = char;

      return char; // return new character
    }

    return null; // otherwise return null
  }
}
