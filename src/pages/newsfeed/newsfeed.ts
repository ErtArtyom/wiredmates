import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';

/**
 * Generated class for the NewsfeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
  public feeds: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public card: Card = new Card();

  constructor (public navCtrl: NavController,
               public navParams: NavParams) {
  }

  x;

  ionViewDidLoad () {
    console.log('ionViewDidLoad NewsfeedPage');
  }

}
