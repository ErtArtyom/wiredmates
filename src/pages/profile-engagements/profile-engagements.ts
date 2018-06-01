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
import { Engagement } from '../../models/engagement';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfileEngagementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-engagements',
  templateUrl: 'profile-engagements.html',
})
export class ProfileEngagementsPage {
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
    console.log('ionViewDidLoad ProfileEngagementPage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactEngagements',
      id: this.card.id
    }, (list: Engagement[]) => {
      list.map((item: Engagement) => {
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
   * @param {Engagement} item
   * @returns {FormGroup}
   */
  addList (item: Engagement): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      organizationName: [item.organizationName],
      eventName: [item.eventName],
      year: [GlobalProvider.toDateTime(item.year)],
      url: [item.url]
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Engagement[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Engagement({
          id: group.get('id').value,
          organizationName: group.get('organizationName').value,
          eventName: group.get('eventName').value,
          year: group.get('year').value,
          url: group.get('url').value
        }));
      });

    this.global.saveProfileContactData({
      action: 'saveContactEngagements',
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
      action: 'removeContactEngagement',
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
    this.list.push(this.addList(new Engagement()));
  }
}
