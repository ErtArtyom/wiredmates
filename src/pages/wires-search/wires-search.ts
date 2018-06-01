import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { RequestData } from '../../models/request-data';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the WiresSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wires-search',
  templateUrl: 'wires-search.html',
})
export class WiresSearchPage {
  public user: User;
  public card: Card;
  public searchQuery: string;
  public cards: Card[];

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private loadingCtrl: LoadingController) {
    this.user = this.auth.user;
    this.card = User.defaultCard(this.user);
    this.searchQuery = this.navParams.data.searchQuery || '';
    this.searchWires();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad WiresSearchPage');
  }

  /**
   * Search Wires by searchQuery
   */
  searchWires (): void {
    if (this.searchQuery && this.searchQuery.trim().length > 2) {
      this.findProfile();
    } else {
      this.clearCards();
    }
  }

  /**
   * Reset mates
   */
  clearCards (): void {
    this.cards = [];
  }

  /**
   * Get mates by search query
   */
  findProfile (): void {
    this.auth.findProfile({
      key: this.searchQuery,
      type: 'not m'
    })
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

}
