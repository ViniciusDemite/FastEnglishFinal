import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeStudentPage } from './home-student';

@NgModule({
  declarations: [
    HomeStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeStudentPage),
  ],
})
export class HomeStudentPageModule {}
