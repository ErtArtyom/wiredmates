import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../models/card';
import { User } from '../../models/user';

/**
 * Generated class for the ProfileBlockComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-block',
  templateUrl: 'profile-block.html'
})
export class ProfileBlockComponent {
  @Input() card: Card;
  @Input() user: User;
  @Output() action: EventEmitter<any> = new EventEmitter();

  public isProfessional = User.isProfessional;

  constructor () {
    console.log('Hello ProfileBlockComponent Component');
  }

  /**
   * On Click Profile Block
   */
  profileBlockClick (): void {
    this.action.emit();
  }
}
