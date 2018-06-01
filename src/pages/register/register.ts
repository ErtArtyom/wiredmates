import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { WelcomePage } from '../welcome/welcome';
import { RequestData } from '../../models/request-data';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public step: number;
  public signUpForm: FormGroup;
  public verificationCode: string;
  public userType: string;
  public organization: string;
  public occupation: string;
  public agreeTermsConditions: boolean;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private formBuilder: FormBuilder,
               private auth: AuthProvider,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController) {
    this.step = 1;
    this.userType = 'm';

    this.createSignUpForm();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad RegisterPage');
  }

  createSignUpForm () {
    this.signUpForm = this.formBuilder.group({
      firstName: ['Arsen', [Validators.required]],
      middleName: [''],
      lastName: ['Babajanyan', [Validators.required]],
      email: ['arsenbabajanyan95@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.minLength(8), Validators.maxLength(32), Validators.required]],
      passwordConf: ['12345678', [Validators.required, this.matchOtherValidator('password')]]
    });
  }

  matchOtherValidator (otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate (control: FormControl) {
      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }

      return null;
    };
  }

  signUpFormSubmit () {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.signUp({
      firstName: this.signUpForm.get('firstName').value,
      middleName: this.signUpForm.get('middleName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      passwordConf: this.signUpForm.get('passwordConf').value
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.step = 2;
        }
      });
  }

  verificationCodeChange (code) {
    if (code.length === 6) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.auth.verify({
        email: this.signUpForm.get('email').value,
        verificationCode: this.verificationCode
      })
        .subscribe((data: RequestData) => {
          loading.dismiss();

          if (data) {
            this.step = 3;
          }
        });
    }
  }

  resendVerificationCode () {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.resendVerificationCode(this.signUpForm.get('email').value)
      .subscribe(() => {
        loading.dismiss();
      });
  }

  registerUserType () {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.registerUserType({
      email: this.signUpForm.get('email').value,
      type: this.userType,
      organization: this.organization,
      occupation: this.occupation,
      agree: this.agreeTermsConditions,
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.navCtrl.setRoot(WelcomePage);
        }
      }, err => console.log(err));
  }
}
