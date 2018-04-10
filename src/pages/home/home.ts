import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatesPage } from '../mates/mates';
import { MatesSearchPage } from '../mates-search/mates-search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor (public navCtrl: NavController) {

  }

  exchange () {

  }

  addMate () {
    this.navCtrl.push(MatesSearchPage);
  }

  myWires () {

  }

  myMates () {
    this.navCtrl.push(MatesPage);
  }

  myCards () {

  }

  inbox () {

  }

  createCard () {

  }
}
