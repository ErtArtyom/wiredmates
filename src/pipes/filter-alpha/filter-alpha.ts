import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterAlphaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterAlpha',
})
export class FilterAlphaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (items: any[], args: any[]): any {
    return items.filter(item => item.firstName.charAt(0).toUpperCase() === args[0]);
  }
}
