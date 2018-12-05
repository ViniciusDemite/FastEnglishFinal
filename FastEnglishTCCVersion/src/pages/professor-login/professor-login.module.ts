import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessorLoginPage } from './professor-login';

@NgModule({
  declarations: [
    ProfessorLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessorLoginPage),
  ],
})
export class ProfessorLoginPageModule {}
