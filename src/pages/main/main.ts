import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor (public navCtrl: NavController,
               public navParams: NavParams) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad MainPage');
  }

  /**
   * Go to RegisterPage
   */
  signup (): void {
    this.navCtrl.push(RegisterPage);
  }

  /**
   * Go to LoginPage
   */
  login (): void {
    this.navCtrl.setRoot(LoginPage);
  }
}
