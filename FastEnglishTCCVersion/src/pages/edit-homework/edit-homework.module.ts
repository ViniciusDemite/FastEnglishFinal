import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHomeworkPage } from './edit-homework';

@NgModule({
  declarations: [
    EditHomeworkPage,
  ],
  imports: [
    IonicPageModule.forChild(EditHomeworkPage),
  ],
})
export class EditHomeworkPageModule {}
