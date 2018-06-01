import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import { ProfileBlockComponent } from './profile-block/profile-block';
import { ProfileTitleComponent } from './profile-title/profile-title';
import { ProfileImageComponent } from './profile-image/profile-image';

@NgModule({
  declarations: [
    ProfileBlockComponent,
    ProfileTitleComponent,
    ProfileImageComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
  ],
  exports: [
    ProfileBlockComponent,
    ProfileTitleComponent,
    ProfileImageComponent
  ]
})
export class ComponentsModule {}
