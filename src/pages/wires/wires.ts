import { Component, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController, NavParams, Platform, Slides } from 'ionic-angular';
import { Card } from '../../models/card';
import { RequestData } from '../../models/request-data';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';
import { MatesSearchPage } from '../mates-search/mates-search';
import { ProfilePage } from '../profile/profile';
import { RecommendPage } from '../recommend/recommend';
import { WiresSearchPage } from '../wires-search/wires-search';

/**
 * Generated class for the WiresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wires',
  templateUrl: 'wires.html',
})
export class WiresPage {
  @ViewChild(Slides) slides: Slides;
  public user: User;
  public cards: Card[];
  public searchQuery: string;
  public sliderHeight: number;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private loadingCtrl: LoadingController,
               private auth: AuthProvider,
               private platform: Platform,
               private modalCtrl: ModalController) {
    this.user = this.auth.user;

    this.getMyCards();

    platform.ready().then(() => {
      this.sliderHeight = platform.height() - 172;
    });
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad WiresPage');

    this.slides.direction = 'vertical';
    this.slides.loop = true;
    this.slides.centeredSlides = true;
    this.slides.spaceBetween = 40;
    this.slides.slidesPerView = 'auto';
    this.slides.initialSlide = 3;
    this.slides.keyboardControl = true;
    this.slides.preventClicks = false;
    this.slides.preventClicksPropagation = false;
    this.slides.effect = 'coverflow';
    this.slides.coverflow = {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: false,
    };
  }

  /**
   * Get My Cards and filter wires
   */
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
          this.cards = this.user.cards.filter((card: Card) => !Card.isMate(card));
        }
      });
  }

  /**
   * Search cards by searchQuery
   */
  searchCards (): void {
    if (this.searchQuery && this.searchQuery.trim().length) {
      this.cards = this.cards
        .filter(card => card.firstName.trim()
          .toLowerCase()
          .search(this.searchQuery.trim().toLowerCase()) !== -1);
    } else {
      this.clearCards();
    }
  }

  /**
   * Reset cards
   */
  clearCards (): void {
    this.cards = this.user.cards.filter((card: Card) => !Card.isMate(card));
  }

  /**
   * Recommend wire
   * @param {Card} card
   */
  recommend (card: Card): void {
    this.modalCtrl.create(RecommendPage, {
      card: card,
    }).present();
  }

  /**
   * Go To Profile
   * @param {Card} card
   */
  goProfile (card: Card): void {
    this.navCtrl.push(ProfilePage, {
      card: card
    });
  }

  /**
   * Go to MatesSearch page
   */
  wiresSearch (): void {
    this.navCtrl.push(WiresSearchPage, {searchQuery: this.searchQuery});
  }
}
