import { GooglePlus } from '@ionic-native/google-plus';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { USER } from '../login/login';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: USER = {
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public googlePlus: GooglePlus, private firebaseAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  async register() {
    try {
      const result = await this.firebaseAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      console.log('result is', result);
    } catch (e) {
      console.log('error', e);
    }
  }
}
