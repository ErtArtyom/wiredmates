import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterMenuPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterMenu',
})
export class FilterMenuPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform (items: any[]): any {
    if (!items) {
      return items;
    }

    console.log(items.filter(item => item.visible));
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.visible);
  }
}
