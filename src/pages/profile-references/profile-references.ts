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
import { Reference } from '../../models/reference';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfileReferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-references',
  templateUrl: 'profile-references.html',
})
export class ProfileReferencesPage {
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
    console.log('ionViewDidLoad ProfileReferencePage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactReferences',
      id: this.card.id
    }, (list: Reference[]) => {
      list.map((item: Reference) => {
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
   * @param {Reference} item
   * @returns {FormGroup}
   */
  addList (item: Reference): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      contactInformation: [item.contactInformation],
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Reference[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Reference({
          id: group.get('id').value,
          name: group.get('name').value,
          contactInformation: group.get('contactInformation').value,
        }));
      });

    this.global.saveProfileContactData({
      action: 'saveContactReferences',
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
      action: 'removeContactReference',
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
    this.list.push(this.addList(new Reference()));
  }
}
