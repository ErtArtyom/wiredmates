import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { RegisterPage } from '../pages/register/register';
import { AuthProvider } from '../providers/auth/auth';
import { WelcomePage } from '../pages/welcome/welcome';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { MessagesPage } from '../pages/messages/messages';
import { AlertsPage } from '../pages/alerts/alerts';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { Camera } from '@ionic-native/camera';
import { CameraMock } from '@ionic-native-mocks/camera';
import { MatesPage } from '../pages/mates/mates';
import { MatesSearchPage } from '../pages/mates-search/mates-search';
import { HttpModule } from '@angular/http';
import { MessagesRoomPage } from '../pages/messages-room/messages-room';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MainPage,
    RegisterPage,
    WelcomePage,
    NewsfeedPage,
    MessagesPage,
    MessagesRoomPage,
    AlertsPage,
    SettingsPage,
    ProfilePage,
    ProfileEditPage,
    MatesPage,
    MatesSearchPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MainPage,
    RegisterPage,
    WelcomePage,
    NewsfeedPage,
    MessagesPage,
    MessagesRoomPage,
    AlertsPage,
    SettingsPage,
    ProfilePage,
    ProfileEditPage,
    MatesPage,
    MatesSearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    {provide: Camera, useClass: CameraMock},
    CallNumber,
  ]
})
export class AppModule {}
