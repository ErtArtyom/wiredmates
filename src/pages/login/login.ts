import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { RequestData } from '../../models/request-data';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public signInForm: FormGroup;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController) {
    this.createSignInForm();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad LoginPage');
  }

  createSignInForm () {
    this.signInForm = this.formBuilder.group({
      email: ['arsenbabajanyan95@gmail.com', [Validators.required]],
      password: ['12345678', [Validators.required]],
    });
  }

  signInFormSubmit (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.signIn({
      username: this.signInForm.get('email').value,
      password: this.signInForm.get('password').value
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.auth.storeUserData(data.token, data.user);

          this.navCtrl.setRoot(TabsPage);
        }
      });
  }
}
