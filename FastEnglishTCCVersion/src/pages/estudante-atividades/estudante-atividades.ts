import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-estudante-atividades',
  templateUrl: 'estudante-atividades.html',
})
export class EstudanteAtividadesPage {

  public lista: Observable<any>;
  public atividade: any = {};
  public recording: boolean = false;
  public recorded: boolean = false;
  public filePath: string;
  public fileName: string;
  public audio: MediaObject;
  public audioList: any[] = [];
  public referencia = firebase.storage().ref();

  constructor(public navCtrl: NavController, public db: AngularFirestore, public afAuth: AngularFireAuth, public alertCtrl: AlertController, private media: Media, private file: File) {

    this.lista = db.collection('atividades').valueChanges();

  }

  public responder(): void {

    this.referencia.child(this.filePath + this.fileName); // referencia para o caminho do arquivo
    this.referencia.put(this.audio); // enviar o arquivo

    this.navCtrl.pop();

  }

  public responder_atividade(id: string): void {
    let sub = this.db.collection('atividades').doc(id).valueChanges()
    .subscribe((atv) => {
      this.atividade = atv;
      sub.unsubscribe();
    })
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
