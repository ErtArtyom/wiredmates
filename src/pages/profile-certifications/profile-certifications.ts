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
import { Certification } from '../../models/certification';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfileCertificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-certifications',
  templateUrl: 'profile-certifications.html',
})
export class ProfileCertificationsPage {
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
    console.log('ionViewDidLoad ProfileCertificationPage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactCertifications',
      id: this.card.id
    }, (list: Certification[]) => {
      list.map((item: Certification) => {
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
   * @param {Certification} item
   * @returns {FormGroup}
   */
  addList (item: Certification): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      authority: [item.authority],
      number: [item.number],
      validUntil: [GlobalProvider.toDateTime(item.validUntil)],
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Certification[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Certification({
          id: group.get('id').value,
          name: group.get('name').value,
          authority: group.get('authority').value,
          number: group.get('number').value,
          validUntil: group.get('validUntil').value
        }));
      });

    this.global.saveProfileContactData({
      action: 'saveContactCertifications',
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
      action: 'removeContactCertification',
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
    this.list.push(this.addList(new Certification()));
  }
}
