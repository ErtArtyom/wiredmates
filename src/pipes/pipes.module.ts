import { NgModule } from '@angular/core';
import { PhonePipe } from './phone/phone';
import { FilterAlphaPipe } from './filter-alpha/filter-alpha';
import { FormatTimePipe } from './format-time/format-time';
import { FilterMenuPipe } from './filter-menu/filter-menu';

@NgModule({
  declarations: [
    PhonePipe,
    FilterAlphaPipe,
    FormatTimePipe,
    FilterMenuPipe
  ],
  imports: [],
  exports: [
    PhonePipe,
    FilterAlphaPipe,
    FormatTimePipe,
    FilterMenuPipe
  ]
})
export class PipesModule {}
