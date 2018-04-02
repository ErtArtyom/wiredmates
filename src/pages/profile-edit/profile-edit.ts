import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  public profileEditForm: FormGroup;
  public user: User;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private formBuilder: FormBuilder,
               private camera: Camera,
               private platform: Platform) {
    platform.ready().then(() => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options)
        .then((imageData) => {
          let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          console.log(err);
        });
    });

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

  }

  editImage () {

  }
}
