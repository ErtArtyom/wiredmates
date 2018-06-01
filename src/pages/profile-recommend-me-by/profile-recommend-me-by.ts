import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CalendarModal } from 'ion2-calendar';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { Employment } from '../../models/employment';
import { Recommendation } from '../../models/recommendation';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfileRecommendMeByPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-recommend-me-by',
  templateUrl: 'profile-recommend-me-by.html',
})
export class ProfileRecommendMeByPage {
  public card: Card;
  public recommendationsForm: FormGroup;

  public editing: boolean = false;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private modalCtrl: ModalController,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController) {
    this.card = this.navParams.data.card;

    this.getContactRecommendations();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileEmploymentPage');
  }

  /**
   * Get Profile Recommendation
   */
  getContactRecommendations (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.getContactRecommendations({
      id: this.card.id
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.createRecommendationForm(new Recommendation(data.data[0]));
        }
      });
  }

  /**
   * Create Recommendation form
   */
  createRecommendationForm (recommendation: Recommendation): void {
    this.recommendationsForm = this.formBuilder.group({
      id: [recommendation.id],
      contactID: [this.card.id],
      recBy1: [recommendation.recBy1],
      recBy2: [recommendation.recBy2],
      recBy3: [recommendation.recBy3],
      recBy4: [recommendation.recBy4],
      recBy5: [recommendation.recBy5],
    });
  }

  /**
   * Recommendations form submit
   */
  recommendationsFormSubmit (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const recommendations: Recommendation = new Recommendation({
      id: this.recommendationsForm.get('id').value,
      contactID: this.recommendationsForm.get('contactID').value,
      recBy1: this.recommendationsForm.get('recBy1').value,
      recBy2: this.recommendationsForm.get('recBy2').value,
      recBy3: this.recommendationsForm.get('recBy3').value,
      recBy4: this.recommendationsForm.get('recBy4').value,
      recBy5: this.recommendationsForm.get('recBy5').value,
    });

    this.auth.saveContactRecommendations({
      id: this.card.id,
      recommendations: recommendations
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.navCtrl.pop();

          this.editing = false;

          this.alertCtrl.create({
            title: 'Success',
            subTitle: data.d,
            buttons: [
              {
                text: 'Ok'
              }
            ]
          }).present();
        }
      });
  }

  // /**
  //  * Open calendar modal
  //  * @param {FormGroup} employment
  //  */
  // openCalendar (employment: FormGroup): void {
  //   const options: CalendarModalOptions = {
  //     pickMode: 'range',
  //     title: 'Calendar'
  //   };
  //
  //   let calendar = this.modalCtrl.create(CalendarModal, {
  //     options: options
  //   });
  //
  //   calendar.present();
  //
  //   calendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
  //     if (date) {
  //       const employments = <FormArray>this.recommendsForm.get('employments');
  //       employments.controls.map((control: FormControl) => {
  //         if (control.get('id').value === employment.controls.id.value) {
  //           control.get('durationFrom').setValue(date.from.dateObj);
  //           control.get('durationTo').setValue(date.to.dateObj);
  //           control.get('duration').setValue(moment(date.from.dateObj).format('MMMM YYYY') + ' - ' + moment(date.to.dateObj).format('MMMM YYYY'));
  //         }
  //       });
  //     }
  //   });
  // }
  //
  // /**
  //  * Add item in form control
  //  */
  // addItem (): void {
  //   const control = <FormArray>this.recommendsForm.controls['employments'];
  //   control.push(this.addList(new Employment()));
  // }

  /**
   * Toggle editing mode
   */
  edit (): void {
    this.editing = !this.editing;
  }
}
