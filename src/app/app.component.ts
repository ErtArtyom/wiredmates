import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MainPage;

  constructor (platform: Platform,
               statusBar: StatusBar,
               splashScreen: SplashScreen,
               private auth: AuthProvider) {
    const token = this.auth.token;
    console.log(token);
    if (token) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = MainPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
