import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { Card } from '../../models/card';
import { Recommendation } from '../../models/recommendation';
import { RequestData } from '../../models/request-data';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { Menu } from '../profile/profile';

/**
 * Generated class for the RecommendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html',
})
export class RecommendPage {
  public user: User;
  public card: Card;
  public toCard: Card;
  public recommendations: Recommendation;
  public recommend: any;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private viewCtrl: ViewController,
               private alertCtrl: AlertController) {
    this.user = this.auth.user;
    this.card = User.defaultCard(this.auth.user);
    this.toCard = this.navParams.data.card;
    this.recommendations = new Recommendation();

    if (this.user.recommendationsByMe[this.card.id][this.toCard.id]) {
      this.setRecommendations({
        recBy1: this.user.recommendationsByMe[this.card.id][this.toCard.id].recBy1,
        recBy2: this.user.recommendationsByMe[this.card.id][this.toCard.id].recBy2,
        recBy3: this.user.recommendationsByMe[this.card.id][this.toCard.id].recBy3,
        recBy4: this.user.recommendationsByMe[this.card.id][this.toCard.id].recBy4,
        recBy5: this.user.recommendationsByMe[this.card.id][this.toCard.id].recBy5,
      });
    } else {
      this.setRecommendations({
        recBy1: 0,
        recBy2: 0,
        recBy3: 0,
        recBy4: 0,
        recBy5: 0,
      });
    }
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad RecommendPage');
  }

  ionViewCanEnter () {
    console.log('ionViewCanEnter');

    return new Promise((resolve, reject) => {
      this.auth.getContactRecommendations({
        id: this.toCard.id
      })
        .subscribe((data: RequestData) => {
          if (data) {
            this.recommendations = new Recommendation(data.data.filter((recommendation: Recommendation) => recommendation.contactID === this.toCard.id)[0]);

            resolve(data);
          } else {
            reject(false);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * Set default recommendations
   * @param data
   */
  setRecommendations (data: any): void {
    this.recommend = {
      recBy1: data.recBy1,
      recBy2: data.recBy2,
      recBy3: data.recBy3,
      recBy4: data.recBy4,
      recBy5: data.recBy5,
    };
  }

  /**
   * Confirm recommendation
   * @param {number} state
   */
  confirm (state: number): void {
    this.auth.saveRecommendationsForCard({
      id: this.toCard.id,
      profileID: this.card.id,
      recVal: state === 1 ? 5 : 0,
      recBy1: state === 1 && this.recommend.recBy1 ? 5 : 0,
      recBy2: state === 1 && this.recommend.recBy2 ? 5 : 0,
      recBy3: state === 1 && this.recommend.recBy3 ? 5 : 0,
      recBy4: state === 1 && this.recommend.recBy4 ? 5 : 0,
      recBy5: state === 1 && this.recommend.recBy5 ? 5 : 0,
      state: state,
    })
      .subscribe((data: RequestData) => {
        if (data) {
          this.alertCtrl.create({
            title: 'Success',
            subTitle: data.d,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  if (state === 1) {
                    this.user.recommendationsByMe[this.card.id][this.toCard.id] = data.data;
                  } else {
                    delete this.user.recommendationsByMe[this.card.id][this.toCard.id];
                  }
                  this.auth.storeUserData(this.auth.token, this.user);

                  this.cancel();
                }
              }
            ]
          }).present();
        }
      });
  }

  /**
   * Close modal
   */
  cancel (): void {
    this.viewCtrl.dismiss();
  }
}
