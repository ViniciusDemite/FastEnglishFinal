import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmPainelPage } from './adm-painel';

@NgModule({
  declarations: [
    AdmPainelPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmPainelPage),
  ],
})
export class AdmPainelPageModule {}
