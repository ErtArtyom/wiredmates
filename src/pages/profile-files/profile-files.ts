import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { FileP } from '../../models/file-p';
import { RequestData } from '../../models/request-data';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfileFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-files',
  templateUrl: 'profile-files.html',
})
export class ProfileFilesPage {
  public card: Card;
  public filesForm: FormGroup;

  public editing: boolean = false;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private auth: AuthProvider,
               private formBuilder: FormBuilder,
               private modalCtrl: ModalController,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController) {
    this.card = this.navParams.data.card;

    this.createFilesForm();
    this.getContactFiles();
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ProfileFilesPage');
  }

  /**
   * Get Profile Files
   */
  getContactFiles (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.getContactFiles({
      id: this.card.id
    })
      .subscribe((data: RequestData) => {
        loading.dismiss();

        if (data) {
          let files = data.data;

          files.map((file: FileP) => {
            const control = <FormArray>this.filesForm.controls['files'];
            control.push(this.addList(file));
          });
        }
      });
  }

  /**
   * Create Files form
   */
  createFilesForm (): void {
    this.filesForm = this.formBuilder.group({
      files: this.formBuilder.array([])
    });
  }

  /**
   * Add File list
   * @param {File} file
   * @returns {FormGroup}
   */
  addList (file: FileP): FormGroup {
    return this.formBuilder.group({
      id: [file.id],
      title: [file.title],
      file: [file.file],
      type: [file.type],
    });
  }

  /**
   * Files form submit
   */
  filesFormSubmit (): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    const files: FileP[] = [];

    const filesFrom = <FormArray>this.filesForm.get('files');
    filesFrom.controls.map(control => {
      files.push(new FileP({
        id: control.get('id').value,
        title: control.get('title').value,
      }));
    });

    this.auth.saveContactFiles({
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
   * Remove file
   * @param {FormGroup} file
   */
  removeFile (file: FormGroup): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.removeContactFile({
      id: this.card.id,
      delID: file.get('id').value
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
                  const control = <FormArray>this.filesForm.controls['files'];
                  control.removeAt(control.value.findIndex(controlFile => controlFile.id === file.controls.id.value));
                }
              },
            ]
          }).present();
        }
      });
  }

  /**
   * Upload file
   * @param event
   */
  uploadFile (event: any): void {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.auth.uploadContactFile({
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
                    const control = <FormArray>this.filesForm.controls['files'];
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
