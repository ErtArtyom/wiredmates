import { Component, Input } from '@angular/core';
import { Details } from '../../models/details';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfileImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-image',
  templateUrl: 'profile-image.html'
})
export class ProfileImageComponent {
  @Input('size') size: string = 'l'; // s o l
  @Input('card') details: Details;

  public domain: string = '';
  public loading: boolean = true;

  constructor (private auth: AuthProvider) {
    console.log('Hello ProfileImageComponent Component');

    this.domain = this.auth.domain;
  }

  /**
   * On Image Load
   */
  onLoad (): void {
    this.loading = false;
  }
}
