import { Component } from '@angular/core';
import { Notify } from '../../models/notify';
import { RequestData } from '../../models/request-data';

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
  public tab1Root = HomePage;
  public tab2Root = NewsfeedPage;
  public tab3Root = MessagesPage;
  public tab4Root = AlertsPage;
  public tab5Root = SettingsPage;

  public messagesCount: number = 0;
  public notifications: number = 0;

  constructor (private auth: AuthProvider) {
    this.notifications = this.auth.user.notifications;

    this.auth.notifications.subscribe((count: number) => {
      this.notifications = count;
    });
  }
}
