import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmFeedbackPage } from './adm-feedback';

@NgModule({
  declarations: [
    AdmFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmFeedbackPage),
  ],
})
export class AdmFeedbackPageModule {}
