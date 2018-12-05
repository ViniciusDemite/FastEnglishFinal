import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

//página de recuperação de senha
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';

//importar a página inicial do app (onde começam os conteusos do estudante)
import {HomeStudentPage} from  '../home-student/home-student';



/**
 * Generated class for the StudentloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'; //sao serviços

@IonicPage()
@Component({
  selector: 'page-studentlogin',
  templateUrl: 'studentlogin.html',
})
export class StudentloginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams , public  afAuth: AngularFireAuth , public atertCtrl:AlertController) {
  }

  /**
   * forgotpass
   */
  public forgotpass(): void {

    this.navCtrl.push(ForgotpasswordPage);
    
  }

  public login(form: NgForm){



    let email = form.value.email;
    let senha = form.value.senha;
    

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
    .then((result) => { 

    const alert = this.atertCtrl.create({
    message: 'Welcome Student',
    buttons: ['OK']
    
    
  });
   this.navCtrl.setRoot(HomeStudentPage);
  return alert.present();
      
      
    })
    .catch((error) => {
      alert('User or Password not found');
    });



  }

}
