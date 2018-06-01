import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ImageCropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-crop',
  templateUrl: 'image-crop.html',
})
export class ImageCropPage {
  public imageChangedEvent: any = '';
  private image: string = '';

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               public viewCtrl: ViewController) {
    this.imageChangedEvent = this.navParams.data.imageChangedEvent;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ImageCropPage');
  }

  /**
   * On Image Cropped
   * @param {string} image
   */
  imageCropped (image: string): void {
    this.image = image;
  }

  /**
   * On Image Loaded
   */
  imageLoaded (): void {
    console.log('imageLoaded');
  }

  /**
   * On Load Image Failed
   */
  loadImageFailed (): void {
    console.log('loadImageFailed');
  }

  /**
   * On Save
   */
  save (): void {
    this.viewCtrl.dismiss(this.image);
  }
}
