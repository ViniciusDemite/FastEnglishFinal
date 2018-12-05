import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { AngularFireAuth } from '@angular/fire/auth';

import { NgForm } from '@angular/forms'

//importar pg que será ancaminhada a função log apos o envio da requisição de reset da senha
import {HomePage} from '../home/home';

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  constructor(private alert:AlertController,
    public navCtrl: NavController,
     public navParams: NavParams , 
    private afAuth: AngularFireAuth) {
  }

  public reset_pass(form : NgForm){

    let email: string = form.value.email;
  
    this.afAuth.auth.sendPasswordResetEmail(email);
  
    let alert = this.alert.create({
      title: 'An E-mal has been send to you, chekck it out.',
      buttons: ['Ok']
    });
    alert.present();
  
  
  
    this.navCtrl.setRoot(HomePage);
    
    
  }
  
}
