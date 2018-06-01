import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';

/**
 * Generated class for the ProfileTitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-title',
  templateUrl: 'profile-title.html'
})
export class ProfileTitleComponent {
  @Input() card: Card;

  constructor () {
    console.log('Hello ProfileTitleComponent Component');
  }

}
