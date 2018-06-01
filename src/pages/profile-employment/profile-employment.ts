import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import { Card } from '../../models/card';
import { Employment } from '../../models/employment';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfileEmploymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-employment',
  templateUrl: 'profile-employment.html',
})
export class ProfileEmploymentPage {
  public editing: boolean;

  public card: Card;
  public dataForm: FormGroup;

  get list (): FormArray {
    return <FormArray>this.dataForm.get('list');
  }

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private modalCtrl: ModalController,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private global: GlobalProvider) {
    this.editing = false;
    this.card = this.navParams.data.card;

    this.createDataForm();
    this.getProfileContactData();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileEmploymentPage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactEmployments',
      id: this.card.id
    }, (list: Employment[]) => {
      list.map((item: Employment) => {
        this.list.push(this.addList(item));
      });
    });
  }

  /**
   * Create DataForm
   */
  createDataForm (): void {
    this.dataForm = this.formBuilder.group({
      list: this.formBuilder.array([])
    });
  }

  /**
   * Add Item To List
   * @param {Employment} item
   * @returns {FormGroup}
   */
  addList (item: Employment): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      title: [item.title],
      employer: [item.employer],
      durationFrom: [GlobalProvider.toDateTime(item.durationFrom)],
      durationTo: [GlobalProvider.toDateTime(item.durationTo)],
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Employment[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Employment({
          id: group.get('id').value,
          title: group.get('title').value,
          employer: group.get('employer').value,
          durationFrom: group.get('durationFrom').value,
          durationTo: group.get('durationTo').value
        }));
      });

    this.global.saveProfileContactData({
      action: 'saveContactEmployments',
      id: this.card.id,
      data: data
    }, () => {
      this.navCtrl.pop();

      this.editing = false;
    });
  }

  /**
   * Remove Item From Form Control
   * @param {FormControl} id
   * @param {number} index
   */
  removeProfileContactData (id: FormControl, index: number): void {
    this.global.removeProfileContactData({
      action: 'removeContactEmployment',
      id: this.card.id,
      delID: id.value
    }, () => {
      this.list.removeAt(index);
    });
  }

  /**
   * Add Item To Form Control
   */
  addItem (): void {
    this.list.push(this.addList(new Employment()));
  }
}

