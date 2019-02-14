import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListHomeworkPage } from './list-homework';

@NgModule({
  declarations: [
    ListHomeworkPage,
  ],
  imports: [
    IonicPageModule.forChild(ListHomeworkPage),
  ],
})
export class ListHomeworkPageModule {}
