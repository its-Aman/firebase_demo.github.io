import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: USER = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private googlePlus: GooglePlus, private firebaseAuth: AngularFireAuth,
    private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async gSignIn() {
    try {
      const result = await this.googlePlus.login({
        'webClientId': '857128314873-j5kgglevjs4l6ilpmqivlldiq7tebbq7.apps.googleusercontent.com',
        'offline': 'true'
      });
      console.log('G+ login result', result);
      alert('1 ' + JSON.stringify(result));
      if (result) {
        try {
          const login = await this.firebaseAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken));
          
          if (login) {
            console.log('Login with google successfull', login);
            alert('1 ' + JSON.stringify(login));
            this.goToSongPage();
          }
        } catch (e) {
          console.log('some error in firebase signin', e);
        }
      }

    } catch (e) {
      console.log('G+ error', e);
      alert('0 ' + JSON.stringify(e));
    }
  }

  async login() {
    try {
      const result = await this.firebaseAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      console.log('logged in', result);
      this.goToSongPage();
    } catch (e) {
      console.log('some error in logging in', e);
    }
  }
  
  async fbSignIn(){
    try {
      const result: FacebookLoginResponse = await this.fb.login(['public_profile', 'user_friends', 'email'])
      console.log('fb response', result);
      alert('1 ' + JSON.stringify(result));      
      this.goToSongPage();
    } catch (e) {
      console.log('fb login error', e);
      alert('0 ' + JSON.stringify(e));      
    }
  }

  goToSongPage(){
    this.navCtrl.setRoot('SongsListPage');
  }

  register() {
    this.navCtrl.push('RegisterPage', { user: this.user });
  }
}


export interface USER {
  email: string,
  password: string
}