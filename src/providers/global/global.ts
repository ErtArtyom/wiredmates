import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Card } from '../../models/card';
import { ProfileGetData } from '../../models/profile-get-data';
import { ProfileRemoveData } from '../../models/profile-remove-data';
import { ProfileSaveData } from '../../models/profile-save-data';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  constructor (public http: HttpClient,
               private auth: AuthProvider,
               private loadingCtrl: LoadingController,
               private toastCtrl: ToastController,
               private alertCtrl: AlertController) {
    console.log('Hello GlobalProvider Provider');
  }

  /**
   * Convert Date String To DateTime
   * @param {string} dateString
   * @returns {string}
   */
  static toDateTime (dateString: string): string {
    try {
      if (dateString) {
        return new Date(dateString).toISOString();
      } else {
        return '';
      }
    } catch (e) {
      return '';
    }
  }

  /**
   * Get Profile Contact Data
   * @param {ProfileGetData} data
   * @param {Function} callback
   */
  getProfileContactData (data: ProfileGetData, callback: Function): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.getProfileContactData(data)
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          let list = data.data;

          if (!list.length) {
            let toast = this.toastCtrl.create({
              message: data.d,
              duration: 3000,
              position: 'top',
              dismissOnPageChange: true
            });
            toast.present();
          }

          callback(list);
        }
      });
  }

  /**
   * Save Profile Contact Data
   * @param {ProfileSaveData} data
   * @param {Function} callback
   */
  saveProfileContactData (data: ProfileSaveData, callback: Function): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.saveProfileContactData(data)
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.alertCtrl.create({
            title: 'Success',
            subTitle: data.d,
            buttons: [
              {
                text: 'Ok'
              }
            ]
          }).present();

          callback();
        }
      });
  }

  /**
   * Remove Profile Contact Data
   * @param {ProfileRemoveData} data
   * @param {Function} callback
   */
  removeProfileContactData (data: ProfileRemoveData, callback: Function) {
    if (data.delID) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.auth.removeProfileContactData(data)
        .subscribe((data: RequestData) => {
          loading.dismiss();

          if (data) {
            this.alertCtrl.create({
              title: 'Success',
              subTitle: data.d,
              buttons: [
                {
                  text: 'Ok'
                }
              ]
            }).present();

            callback();
          }
        });
    } else {
      callback();
    }
  }

  /**
   * Create Alphabetic array by card
   * @param {Card[]} cards
   * @returns {string[]}
   */
  static createAlphas (cards: Card[]) {
    const alphas = cards.map((card: Card) => card.firstName.charAt(0).toUpperCase());

    return alphas.filter((x, i, a) => a.indexOf(x) == i);
  }
}
