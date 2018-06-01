import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Slides } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { Card } from '../../models/card';
import { Recommendation } from '../../models/recommendation';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../../providers/auth/auth';
import { MessagesRoomPage } from '../messages-room/messages-room';
import { ProfileAwardsPage } from '../profile-awards/profile-awards';
import { ProfileCertificationsPage } from '../profile-certifications/profile-certifications';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { User } from '../../models/user';
import { ProfileEducationPage } from '../profile-education/profile-education';
import { ProfileEmploymentPage } from '../profile-employment/profile-employment';
import { ProfileEngagementsPage } from '../profile-engagements/profile-engagements';
import { ProfileFilesPage } from '../profile-files/profile-files';
import { ProfileLicensesPage } from '../profile-licenses/profile-licenses';
import { ProfileMediaPage } from '../profile-media/profile-media';
import { ProfileMembershipsPage } from '../profile-memberships/profile-memberships';
import { ProfilePatentsPage } from '../profile-patents/profile-patents';
import { ProfilePublicationsPage } from '../profile-publications/profile-publications';
import { ProfileRecommendMeByPage } from '../profile-recommend-me-by/profile-recommend-me-by';
import { ProfileReferencesPage } from '../profile-references/profile-references';
import { RecommendPage } from '../recommend/recommend';


export class Menu {
  name: string;
  title: string;
  page: Page;
  params: any;
  visible?: boolean;
}

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Slides) slides: Slides;

  public user: User;
  public card: Card;
  public isMyProfile: boolean = false;

  public isProfessional = Card.isProfessional;
  public isMate = Card.isMate;

  public menus: Menu[];

  public recommendations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private modalCtrl: ModalController) {
    this.user = this.auth.user;
    this.card = this.navParams.data.card;
    this.isMyProfile = this.navParams.data.id === this.auth.user.id;

    //TODO involvements page
    this.menus = [
      {name: 'medias', title: 'Media', page: ProfileMediaPage, params: {card: this.card, id: this.user.id}},
      {name: 'files', title: 'Files', page: ProfileFilesPage, params: {card: this.card, id: this.user.id}},
      {
        name: 'employments',
        title: 'Employment',
        page: ProfileEmploymentPage,
        params: {card: this.card, id: this.user.id}
      },
      {name: 'educations', title: 'Education', page: ProfileEducationPage, params: {card: this.card, id: this.user.id}},
      {name: 'awards', title: 'Awards', page: ProfileAwardsPage, params: {card: this.card, id: this.user.id}},
      {
        name: 'memberships',
        title: 'Memberships',
        page: ProfileMembershipsPage,
        params: {card: this.card, id: this.user.id}
      },
      {name: 'patents', title: 'Patents', page: ProfilePatentsPage, params: {card: this.card, id: this.user.id}},
      {
        name: 'engagements',
        title: 'Speaking Engagements',
        page: ProfileEngagementsPage,
        params: {card: this.card, id: this.user.id}
      },
      {
        name: 'publications',
        title: 'Publications',
        page: ProfilePublicationsPage,
        params: {card: this.card, id: this.user.id}
      },
      {
        name: 'references',
        title: 'References',
        page: ProfileReferencesPage,
        params: {card: this.card, id: this.user.id}
      },
      {
        name: 'recommendations',
        title: 'Recommend me by',
        page: ProfileRecommendMeByPage,
        params: {card: this.card, id: this.user.id}
      },
      // {
      //   name: '',
      //   title: 'Edit card template',
      //   page: ProfileRecommendMeByPage,
      //   params: {card: this.card, id: this.user.id}
      // },
      {
        name: 'certifications',
        title: 'Certifications',
        page: ProfileCertificationsPage,
        params: {card: this.card, id: this.user.id}
      },
      {name: 'licenses', title: 'Licenses', page: ProfileLicensesPage, params: {card: this.card, id: this.user.id}},
      {
        name: 'involvements',
        title: 'Involvements',
        page: ProfileLicensesPage,
        params: {card: this.card, id: this.user.id}
      },
    ];
  }

  ionViewCanEnter () {
    console.log('ionViewCanEnter');
    return new Promise((resolve, reject) => {
      this.auth.getProfile({
        id: this.card.id
      })
        .subscribe((data: RequestData) => {
          if (data) {
            console.log(data);

            console.log(this.card);

            this.card = new Card(data.data);

            console.log(this.card);

            this.auth.storeUserContact(this.card);

            this.menus.map((menu: Menu) => {
              if (this.isMyProfile || this.card.menus[menu.name].length) {
                console.log(this.isMyProfile, this.card.menus[menu.name].length);
                menu.visible = true;
              }
            });

            resolve(data);
          } else {
            reject(false);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfilePage');

    this.slides.spaceBetween = 4;
    this.slides.slidesPerView = 4;
    this.slides.keyboardControl = true;
    this.slides.preventClicks = false;
    this.slides.preventClicksPropagation = false;
  }

  /**
   * Edit profile
   */
  edit (): void {
    this.navCtrl.push(ProfileEditPage, {
      card: this.card,
      callback: () => {
        return new Promise((resolve) => {
          if (this.isMyProfile) {
            this.user = this.auth.user;
            this.card = User.defaultCard(this.auth.user);

            console.log(this.user, this.card);
          }

          resolve();
        });
      }
    });
  }

  shareCard () {

  }

  /**
   * Go To Message Page
   */
  message (): void {
    this.navCtrl.push(MessagesRoomPage, {
      toCard: this.card
    });
  }

  requestCard () {

  }

  trustOpinion () {

  }

  /**
   * Recommend card
   */
  recommend (): void {
    this.modalCtrl.create(RecommendPage, {
      card: this.card
    }).present();
  }

  /**
   * Go to specified page
   * @param item
   */
  goPage (item: {
    name: string,
    page: Page,
    params?: any
  }): void {
    this.navCtrl.push(item.page, item.params);
  }
}
