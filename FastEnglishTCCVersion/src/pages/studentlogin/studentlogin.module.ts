import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentloginPage } from './studentlogin';

@NgModule({
  declarations: [
    StudentloginPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentloginPage),
  ],
})
export class StudentloginPageModule {}
