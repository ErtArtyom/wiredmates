import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NewsfeedPage } from '../newsfeed/newsfeed';
import { AlertsPage } from '../alerts/alerts';
import { SettingsPage } from '../settings/settings';
import { MessagesPage } from '../messages/messages';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewsfeedPage;
  tab3Root = MessagesPage;
  tab4Root = AlertsPage;
  tab5Root = SettingsPage;

  constructor (private auth: AuthProvider) {

  }

  ionViewCanEnter () {
    return this.auth.token;
  }
}
