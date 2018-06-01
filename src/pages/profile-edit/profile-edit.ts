import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Page } from 'ionic-angular/navigation/nav-util';
import { Card } from '../../models/card';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { ImageCropPage } from '../image-crop/image-crop';
import { ProfileAwardsPage } from '../profile-awards/profile-awards';
import { ProfileCertificationsPage } from '../profile-certifications/profile-certifications';
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

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {
  @ViewChild('birthday') birthday;

  public isProfessional = User.isProfessional;

  public user: User;
  public card: Card;
  public profileEditForm: FormGroup;

  public addItems = {
    phone: 0,
    email: 0,
    address: 0,
  };

  public menu: {
    name: string,
    page: Page,
    params?: any
  }[];

  private callback: any;
  public phoneMask: Array<string | RegExp>;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private formBuilder: FormBuilder,
               private loadingCtrl: LoadingController,
               private auth: AuthProvider,
               private alertCtrl: AlertController,
               private modalCtrl: ModalController) {
    this.user = this.auth.user;
    this.card = this.navParams.data.card;

    this.phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    this.menu = [
      {name: 'Media', page: ProfileMediaPage, params: {card: this.card, id: this.user.id}},
      {name: 'Files', page: ProfileFilesPage, params: {card: this.card, id: this.user.id}},
      {name: 'Employment', page: ProfileEmploymentPage, params: {card: this.card, id: this.user.id}},
      {name: 'Education', page: ProfileEducationPage, params: {card: this.card, id: this.user.id}},
      {name: 'Awards', page: ProfileAwardsPage, params: {card: this.card, id: this.user.id}},
      {name: 'Memberships', page: ProfileMembershipsPage, params: {card: this.card, id: this.user.id}},
      {name: 'Patents', page: ProfilePatentsPage, params: {card: this.card, id: this.user.id}},
      {name: 'Speaking Engagements', page: ProfileEngagementsPage, params: {card: this.card, id: this.user.id}},
      {name: 'Publications', page: ProfilePublicationsPage, params: {card: this.card, id: this.user.id}},
      {name: 'References', page: ProfileReferencesPage, params: {card: this.card, id: this.user.id}},
      {name: 'Recommend me by', page: ProfileRecommendMeByPage, params: {card: this.card, id: this.user.id}},
      {name: 'Edit card template', page: ProfileRecommendMeByPage, params: {card: this.card, id: this.user.id}},
      {name: 'Certifications', page: ProfileCertificationsPage, params: {card: this.card, id: this.user.id}},
      {name: 'Licenses', page: ProfileLicensesPage, params: {card: this.card, id: this.user.id}},
    ];

    this.createProfileEditForm();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  ionViewWillEnter () {
    this.callback = this.navParams.get('callback');
  }

  /**
   * On Image Change
   * @param event
   */
  imageChange (event: any): void {
    let imageCropModal = this.modalCtrl.create(ImageCropPage, {
      imageChangedEvent: event
    }, {
      showBackdrop: true
    });

    imageCropModal.onDidDismiss(image => {
      this.card.photo = image;
      this.profileEditForm.get('photo').setValue(image);
    });

    imageCropModal.present();
  }

  createProfileEditForm () {
    this.profileEditForm = this.formBuilder.group({
      firstName: [this.card.firstName],
      middleName: [this.card.middleName],
      lastName: [this.card.lastName],
      organization: [this.card.organization],
      organizationMode: [this.card.organizationMode],
      occupation: [this.card.occupation],
      occupationMode: [this.card.occupationMode],
      phone: [this.card.phone],
      phoneMode: [this.card.phoneMode],
      add_phone1: [this.card.add_phone1],
      add_phone1Mode: [this.card.add_phone1Mode],
      add_phone2: [this.card.add_phone2],
      add_phone2Mode: [this.card.add_phone2Mode],
      birthday: [this.card.birthday],
      birthdayMode: [this.card.birthdayMode],
      email: [this.card.email],
      emailMode: [this.card.emailMode],
      add_email1: [this.card.add_email1],
      add_email1Mode: [this.card.add_email1Mode],
      address1: [this.card.address1],
      address1Mode: [this.card.address1Mode],
      address2: [this.card.address2],
      address2Mode: [this.card.address2Mode],
      about: [this.card.about],
      aboutMode: [this.card.aboutMode],
      photo: [this.card.photo],
    });

    if (this.card.add_phone1) {
      this.addItems['phone'] = 1;
    }
    if (this.card.add_phone2) {
      this.addItems['phone'] = 2;
    }
    if (this.card.add_email1) {
      this.addItems['email'] = 1;
    }
    if (this.card.address2) {
      this.addItems['address'] = 1;
    }

    if (this.card.birthday) {
      setTimeout(() => {
        this.profileEditForm.get('birthday').setValue(new Date(this.card.birthday).toISOString());
      });
    }
  }

  profileEditFormSubmit () {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const card = new Card({
      id: this.card.id,
      firstName: this.profileEditForm.get('firstName').value,
      middleName: this.profileEditForm.get('middleName').value,
      lastName: this.profileEditForm.get('lastName').value,
      organization: this.profileEditForm.get('organization').value,
      organizationMode: this.profileEditForm.get('organizationMode').value,
      occupation: this.profileEditForm.get('occupation').value,
      occupationMode: this.profileEditForm.get('occupationMode').value,
      phone: Card.unmaskPhone(this.profileEditForm.get('phone').value),
      phoneMode: this.profileEditForm.get('phoneMode').value,
      add_phone1: Card.unmaskPhone(this.profileEditForm.get('add_phone1').value),
      add_phone1Mode: this.profileEditForm.get('add_phone1Mode').value,
      add_phone2: Card.unmaskPhone(this.profileEditForm.get('add_phone2').value),
      add_phone2Mode: this.profileEditForm.get('add_phone2Mode').value,
      birthday: this.profileEditForm.get('birthday').value,
      birthdayMode: this.profileEditForm.get('birthdayMode').value,
      email: this.profileEditForm.get('email').value,
      emailMode: this.profileEditForm.get('emailMode').value,
      add_email1: this.profileEditForm.get('add_email1').value,
      add_email1Mode: this.profileEditForm.get('add_email1Mode').value,
      address1: this.profileEditForm.get('address1').value,
      address1Mode: this.profileEditForm.get('address1Mode').value,
      address2: this.profileEditForm.get('address2').value,
      address2Mode: this.profileEditForm.get('address2Mode').value,
      about: this.profileEditForm.get('about').value,
      aboutMode: this.profileEditForm.get('aboutMode').value,
      photo: this.profileEditForm.get('photo').value,
    });

    this.auth.saveContactDetails(card)
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.auth.storeUserContact(new Card(data.contact));

          this.alertCtrl.create({
            title: 'Success',
            subTitle: data.d,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.pop().then(this.callback());
                }
              }
            ]
          }).present();
        }
      });
  }

  editImage () {
    // this.camera.getPicture(this.cameraOptions)
    //   .then((imageData) => {
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     alert(base64Image);
    //   }, (err) => {
    //     console.log(err);
    //     alert(err);
    //   });
  }

  addItem (item: string): void {
    this.addItems[item]++;
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

  editProfileTitle (card: Card): string {
    if (card.id) {
      return card.firstName + ' ' + card.lastName.charAt(0);
    } else {
      return 'New Profile';
    }
  }
}
