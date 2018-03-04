import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-songs-list',
  templateUrl: 'songs-list.html',
})
export class SongsListPage {

  // songs: Observable<any[]>;
  songs: firebase.database.Reference

  constructor(public navCtrl: NavController, public navParams: NavParams,
    afDb: AngularFireDatabase, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    // this.songs = afDb.list('songs').valueChanges();
    this.songs = afDb.database.ref('songs');
    console.log('songs are', this.songs);

  }

  addSong() {
    const prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: 'Enter the name of the song',
      inputs: [{
        name: 'title',
        placeholder: 'Title'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.songs.set({
            id: data.title,
            title: data.title
          });
        }
      }]
    });

    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongsListPage');
  }

  showOptions(song) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [{
        text: 'Update title',
        handler: () => { this.updateSong(song) }
      },
      {
        text: 'Delete Song',
        role: 'destructive',
        handler: () => { this.removeSong(song.id) }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }]
    });

    actionSheet.present();
  }

  removeSong(songId: string) {
    this.songs.remove();
  }

  updateSong(song) {
    const prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: 'Update the song for this song',
      inputs: [{
        name: 'title',
        placeholder: 'Title',
        value: song.title
      }],
      buttons: [{
        text: 'Cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: (data) => {
          this.songs.update({
            id: data.title,
            title: data.title
          });
        }
      }]
    });

    prompt.present();
  }

}