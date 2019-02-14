import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioListStudentsPage } from './audio-list-students';

@NgModule({
  declarations: [
    AudioListStudentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioListStudentsPage),
  ],
})
export class AudioListStudentsPageModule {}
