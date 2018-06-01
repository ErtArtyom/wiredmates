import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PhonePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (value: string, ...args) {
    let newStr = '', i;
    value = value.charAt(0) != '0' ? '0' + value : '' + value;

    for (i = 0; i < (Math.floor(value.length / 2) - 1); i++) {
      newStr = newStr + value.substr(i * 2, 2) + '-';
      console.log(value);
    }

    return newStr + value.substr(i * 2);
  }
}
