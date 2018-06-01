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
import { Patent } from '../../models/patent';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfilePatentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-patents',
  templateUrl: 'profile-patents.html',
})
export class ProfilePatentsPage {
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
    console.log('ionViewDidLoad ProfilePatentPage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactPatents',
      id: this.card.id
    }, (list: Patent[]) => {
      list.map((item: Patent) => {
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
   * @param {Patent} item
   * @returns {FormGroup}
   */
  addList (item: Patent): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      title: [item.title],
      office: [item.office],
      number: [item.number],
      dateIssued: [GlobalProvider.toDateTime(item.dateIssued)],
      description: [item.description],
      inventorName: [item.inventorName],
      status: [item.status],
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Patent[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Patent({
          id: group.get('id').value,
          title: group.get('title').value,
          office: group.get('office').value,
          number: group.get('number').value,
          dateIssued: group.get('dateIssued').value,
          description: group.get('description').value,
          inventorName: group.get('inventorName').value,
          status: Number(group.get('status').value),
        }));
      });

    this.global.saveProfileContactData({
      action: 'saveContactPatents',
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
      action: 'removeContactPatent',
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
    this.list.push(this.addList(new Patent()));
  }
}
