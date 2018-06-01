import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { Card } from '../models/card';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MainPage;

  public card: Card;

  constructor (platform: Platform,
               statusBar: StatusBar,
               splashScreen: SplashScreen,
               private auth: AuthProvider,
               private events: Events) {
    if (this.auth.token) {
      this.rootPage = TabsPage;

      // this.auth.deleteAccount().subscribe(() => {});
    } else {
      this.rootPage = MainPage;
    }

    this.events.subscribe('mate:activated', (card) => {
      this.card = card;
    });

    this.auth.onRoot()
      .subscribe(() => this.rootPage = MainPage);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * Reset activated card
   * @param event
   */
  resetCard (event: any = null): void {
    if (!event) {
      this.card = undefined;
      return;
    }

    const target = event.target || event.srcElement || event.currentTarget;
    const id = target.attributes.id;

    if (id && id.nodeValue === 'sheet-effect') {
      this.card = undefined;
    }
  }

  mateSheetAction (action): void {
    let card = this.card;
    this.resetCard();

    this.events.publish('mate:' + action, card);
  }

}
