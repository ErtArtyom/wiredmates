import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { CalendarModule } from 'ion2-calendar';
import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ComponentsModule } from '../components/components.module';
import { MyProfilesPage } from '../pages/my-profiles/my-profiles';
import { ProfileCertificationsPage } from '../pages/profile-certifications/profile-certifications';
import { ProfileLicensesPage } from '../pages/profile-licenses/profile-licenses';
import { RecommendPage } from '../pages/recommend/recommend';
import { WiresSearchPage } from '../pages/wires-search/wires-search';
import { WiresPage } from '../pages/wires/wires';

import { AuthProvider } from '../providers/auth/auth';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import { MyApp } from './app.component';

import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { MatesPage } from '../pages/mates/mates';
import { MatesSearchPage } from '../pages/mates-search/mates-search';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesRoomPage } from '../pages/messages-room/messages-room';
import { AlertsPage } from '../pages/alerts/alerts';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { ProfileFilesPage } from '../pages/profile-files/profile-files';
import { ProfileMediaPage } from '../pages/profile-media/profile-media';
import { ProfileEmploymentPage } from '../pages/profile-employment/profile-employment';
import { ProfileEducationPage } from '../pages/profile-education/profile-education';
import { ProfileAwardsPage } from '../pages/profile-awards/profile-awards';
import { ProfileEngagementsPage } from '../pages/profile-engagements/profile-engagements';
import { ProfileMembershipsPage } from '../pages/profile-memberships/profile-memberships';
import { ProfilePatentsPage } from '../pages/profile-patents/profile-patents';
import { ProfilePublicationsPage } from '../pages/profile-publications/profile-publications';
import { ProfileRecommendMeByPage } from '../pages/profile-recommend-me-by/profile-recommend-me-by';
import { ProfileReferencesPage } from '../pages/profile-references/profile-references';
import { ImageCropPage } from '../pages/image-crop/image-crop';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { GlobalProvider } from '../providers/global/global';

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
    ImageCropPage,
    ProfileMediaPage,
    ProfileFilesPage,
    ProfileEmploymentPage,
    ProfileEducationPage,
    ProfileRecommendMeByPage,
    ProfileAwardsPage,
    ProfileMembershipsPage,
    ProfilePatentsPage,
    ProfileEngagementsPage,
    ProfilePublicationsPage,
    ProfileReferencesPage,
    ProfileCertificationsPage,
    ProfileLicensesPage,
    MyProfilesPage,
    RecommendPage,
    WiresPage,
    WiresSearchPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule,
    BrMaskerModule,
    TextMaskModule,
    CalendarModule,
    ImageCropperModule,
    IonAlphaScrollModule,
  ],
  bootstrap: [
    IonicApp
  ],
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
    ImageCropPage,
    ProfileMediaPage,
    ProfileFilesPage,
    ProfileEmploymentPage,
    ProfileEducationPage,
    ProfileRecommendMeByPage,
    ProfileAwardsPage,
    ProfileMembershipsPage,
    ProfilePatentsPage,
    ProfileEngagementsPage,
    ProfilePublicationsPage,
    ProfileReferencesPage,
    ProfileCertificationsPage,
    ProfileLicensesPage,
    MyProfilesPage,
    RecommendPage,
    WiresPage,
    WiresSearchPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Camera,
    CallNumber,
    LaunchNavigator,
    GlobalProvider,
  ]
})
export class AppModule {}

