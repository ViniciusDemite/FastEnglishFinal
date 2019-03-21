import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
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
  public audioRef;
  public audioPathRef;


  constructor(public navCtrl: NavController, public db: AngularFirestore, public alertCtrl: AlertController, public media: Media, public file: File) {
  }

  public cad_atividade(form: NgForm): void {

    let titulo: string = form.value.titulo;
    let dataPostada: Date = form.value.dataPostada;
    let dataEntrega: Date = form.value.dataEntrega;
    let descricao: string = form.value.descricao;
    let ativa: boolean = form.value.ativa;

    let atividade: any = {

      nome:titulo,
      dataPostada:dataPostada,
      dataEntrega:dataEntrega,
      descricao:descricao,
      ativo:ativa
    }

    this.db.collection('atividades').add(atividade)
      .then((ref) => {

        this.db.collection('atividades').doc(ref.id).update({ id: ref.id });

        // this.storageRef.child(this.fileName);
        // this.storageRef.child(this.filePath);
        // this.storageRef.put(this.filePath);

        this.navCtrl.pop();
      })
      .catch((error) => {
        alert(error);
      });
    
  }

  public gravar(): void {
    this.fileName = 'record' + new Date().getTime + '.3gp';
    this.audioRef = this.storageRef.child(this.fileName);
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audioPathRef = this.storageRef.child(this.filePath);
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.storageRef.storage.ref().put(this.audio)
      .then(() => {
        alert('Áudio no storage');
        this.recording = true;
      })
      .catch((error) => {
        alert(error);
      })
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
