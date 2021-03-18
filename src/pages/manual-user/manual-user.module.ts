import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManualUserPage } from './manual-user';

@NgModule({
  declarations: [
    ManualUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ManualUserPage),
  ],
})
export class ManualUserPageModule {}
