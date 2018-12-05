import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitialpagePage } from './initialpage';

@NgModule({
  declarations: [
    InitialpagePage,
  ],
  imports: [
    IonicPageModule.forChild(InitialpagePage),
  ],
})
export class InitialpagePageModule {}
