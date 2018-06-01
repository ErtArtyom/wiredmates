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
import { Publication } from '../../models/publication';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ProfilePublicationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-publications',
  templateUrl: 'profile-publications.html',
})
export class ProfilePublicationsPage {
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
    console.log('ionViewDidLoad ProfilePublicationPage');
  }

  /**
   * Get Profile Contact Data
   */
  getProfileContactData (): void {
    this.global.getProfileContactData({
      action: 'getContactPublications',
      id: this.card.id
    }, (list: Publication[]) => {
      list.map((item: Publication) => {
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
   * @param {Publication} item
   * @returns {FormGroup}
   */
  addList (item: Publication): FormGroup {
    return this.formBuilder.group({
      id: [item.id],
      title: [item.title],
      publisherName: [item.publisherName],
      datePublished: [GlobalProvider.toDateTime(item.datePublished)],
      coAuthors: [item.coAuthors],
      url: [item.url],
      description: [item.description],
    });
  }

  /**
   * DataForm Submit
   */
  saveProfileContactData (): void {
    const data: Publication[] = [];

    this.list.controls
      .map((group: FormGroup) => {
        data.push(new Publication({
          id: group.get('id').value,
          title: group.get('title').value,
          publisherName: group.get('publisherName').value,
          datePublished: group.get('datePublished').value,
          coAuthors: group.get('coAuthors').value,
          url: group.get('url').value,
          description: group.get('description').value
        }));
      });

    this.global.saveProfileContactData({
      action: 'saveContactPublications',
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
      action: 'removeContactPublication',
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
    this.list.push(this.addList(new Publication()));
  }
}
