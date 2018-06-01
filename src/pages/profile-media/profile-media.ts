import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { FileP } from '../../models/file-p';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfileMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-media',
  templateUrl: 'profile-media.html',
})
export class ProfileMediaPage {
  public card: Card;
  public mediasForm: FormGroup;

  public editing: boolean = false;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private modalCtrl: ModalController,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController) {
    this.card = this.navParams.data.card;

    this.createMediasForm();
    this.getContactMedias();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileMediasPage');
  }

  /**
   * Get Profile Medias
   */
  getContactMedias (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.getContactMedias({
      id: this.card.id
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          let files = data.data;

          files.map((media: FileP) => {
            const control = <FormArray>this.mediasForm.controls['medias'];
            control.push(this.addList(media));
          });
        }
      });
  }

  /**
   * Create Medias form
   */
  createMediasForm (): void {
    this.mediasForm = this.formBuilder.group({
      medias: this.formBuilder.array([])
    });
  }

  /**
   * Add File list
   * @param {File} media
   * @returns {FormGroup}
   */
  addList (media: FileP): FormGroup {
    return this.formBuilder.group({
      id: [media.id],
      title: [media.title],
      file: [media.file],
      type: [media.type],
    });
  }

  /**
   * Medias form submit
   */
  mediasFormSubmit (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const files: FileP[] = [];

    const mediasFrom = <FormArray>this.mediasForm.get('medias');
    mediasFrom.controls.map(control => {
      files.push(new FileP({
        id: control.get('id').value,
        title: control.get('title').value,
      }));
    });

    this.auth.saveContactMedias({
      id: this.card.id,
      files: files
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

  /**
   * Toggle editing mode
   */
  edit (): void {
    this.editing = !this.editing;
  }

  /**
   * Remove media
   * @param {FormGroup} media
   */
  removeMedia (media: FormGroup): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.removeContactMedia({
      id: this.card.id,
      delID: media.get('id').value
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          this.alertCtrl.create({
            title: 'Success',
            subTitle: data.d,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  const control = <FormArray>this.mediasForm.controls['medias'];
                  control.removeAt(control.value.findIndex(controlFile => controlFile.id === media.controls.id.value));
                }
              },
            ]
          }).present();
        }
      });
  }

  /**
   * Upload media
   * @param event
   */
  uploadMedia (event: any): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.auth.uploadContactMedia({
        id: this.card.id,
        file: file
      })
        .subscribe((data: RequestData) => {
          loading.dismiss();

          if (data) {
            this.alertCtrl.create({
              title: 'Success',
              subTitle: data.d,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    const control = <FormArray>this.mediasForm.controls['medias'];
                    control.push(this.addList(new FileP(data.data)));
                  }
                },
              ]
            }).present();
          }
        });
    }
  }
}
