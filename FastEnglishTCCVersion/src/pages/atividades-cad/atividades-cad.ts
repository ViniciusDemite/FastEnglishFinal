import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FirebaseStorage } from '@angular/fire';
import firebase from 'firebase';

@Component({
  selector: 'page-atividades-cad',
  templateUrl: 'atividades-cad.html',
})
export class AtividadesCadPage {

  public recording: boolean = false;
  public recorded: boolean = false;
  public filePath: string;
  public fileName: string;
  public audio: MediaObject;
  public audioList: any[] = [];
  public storageRef = firebase.storage().ref();


  constructor(public navCtrl: NavController, public db: AngularFirestore,
    public alertCtrl: AlertController, private media: Media, private file: File, private storage: FirebaseStorage) {
  }

  public cad_atividade(form: NgForm): void {

    let titulo: string = form.value.titulo;
    let dataPostada: Date = form.value.dataPostada;
    let dataEntrega: Date = form.value.dataEntrega;
    let descricao: string = form.value.descricao;
    let ativa: boolean = form.value.ativa;

    let atividade: any = {

      titulo:titulo,
      dataPostada:dataPostada,
      dataEntrega:dataEntrega,
      descricao:descricao,
      ativa:ativa

    }

    if (dataEntrega != dataPostada && dataEntrega < dataPostada) {

      this.db.collection('atividades').add(atividade)
        .then(() => {

          // this.storageRef.child(this.fileName);
          // this.storageRef.child(this.filePath);
          this.storageRef.put(this.filePath);

          this.navCtrl.pop();
        })
        .catch((error) => {
          alert(error);
        });
      
    } else {
      
      const alert = this.alertCtrl.create({
        title: 'Check your dates',
        message: 'One of your dates is wrong, please check them.',
        buttons: ['Back']
      });
      alert.present();

    }
    
  }

  public gravar(): void {
    this.fileName = 'record' + new Date().getTime + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  public pararGravar() {
    this.audio.stopRecord();
    this.recording = false;
    this.recorded = true;
  }

  public reproduzir(): void {
    this.audio.play();
    this.audio.setVolume(1.0);
  }

}
