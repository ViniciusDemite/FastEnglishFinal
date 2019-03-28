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
  public referencia = firebase.storage().ref();


  constructor(public navCtrl: NavController, public db: AngularFirestore, public alertCtrl: AlertController, private media: Media, private file: File) {
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

        this.referencia.child(this.filePath + this.fileName); // referencia para o caminho do arquivo
        this.referencia.put(this.audio); // enviar o arquivo

        this.navCtrl.pop();
      })
      .catch((error) => {
        alert(error);
      });
    
  }

  public gravar(): void {
    this.fileName = 'record' + new Date().getTime + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
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
