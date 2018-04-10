import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../models/user';

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
  public profileEditForm: FormGroup;
  public user: User;

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  cameraOptions: CameraOptions = {};

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private formBuilder: FormBuilder,
               private camera: Camera,
               private loadingCtrl: LoadingController,
               private auth: AuthProvider,
               private alertCtrl: AlertController) {
    this.user = this.navParams.data.user;

    this.createProfileEditForm();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  createProfileEditForm () {
    this.profileEditForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      middleName: [this.user.middleName],
      lastName: [this.user.lastName, [Validators.required]],
      organization: [this.user.organization, [Validators.required]],
      occupation: [this.user.occupation, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      address1: [this.user.address1, [Validators.required]],
    });
  }

  profileEditFormSubmit () {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const user = {
      action: 'saveContactDetails',
      token: this.auth.token,
      id: this.user.id,
      templateID: 0,
      email: this.profileEditForm.get('email').value,
      emailMode: this.profileEditForm.get('emailMode').value,
      phone: this.profileEditForm.get('phone').value,
      phoneMode: this.profileEditForm.get('phoneMode').value,
      firstName: this.profileEditForm.get('firstName').value,
      middleName: this.profileEditForm.get('middleName').value,
      lastName: this.profileEditForm.get('lastName').value,
      organization: this.profileEditForm.get('organization').value,
      organizationMode: this.profileEditForm.get('organizationMode').value,
      position: null,
      positionMode: this.profileEditForm.get('positionMode').value,
      occupation: this.profileEditForm.get('occupation').value,
      occupationMode: this.profileEditForm.get('occupationMode').value,
      occupationKey: null,
      fax: null,
      faxMode: this.profileEditForm.get('faxMode').value,
      address1: this.profileEditForm.get('address1').value,
      address1Mode: this.profileEditForm.get('address1Mode').value,
      city: null,
      state: null,
      zip: null,
      country: null,
      website: null,
      facebook: null,
      linkedIn: null,
      twitter: null,
      shortInfo: null,
      photo: null,
      active: null,
      public: null,
      isDefault: null,
    };

    this.auth.saveContactDetails(user)
      .subscribe((data: any) => {
        loading.dismiss();

        if (data.e) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: data.d,
            buttons: ['Ok']
          });

          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: data.d,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });

          alert.present();
        }
      }, err => console.log(err));
  }

  editImage () {
    this.camera.getPicture(this.cameraOptions)
      .then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        alert(base64Image);
      }, (err) => {
        console.log(err);
        alert(err);
      });
  }
}
