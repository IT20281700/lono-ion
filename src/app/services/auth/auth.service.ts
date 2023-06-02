import { Injectable } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private toastController: ToastController
  ) {}

  async authentication({ email, password }: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (err) {
      return null;
    }
  }

  async register({
    user_title,
    firstname,
    lastname,
    email,
    password,
    bdate,
  }: any) {
    let userDetails = { user_title, firstname, lastname, bdate };

    return new Promise((resolve, reject) => {
      try {
        createUserWithEmailAndPassword(this.auth, email, password)
          .then(async (res) => {
            await setDoc(doc(this.firestore, 'users', email), userDetails);
            resolve(res);
          })
          .catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });
  }

  async logout() {
    await signOut(this.auth).then(async (res) => {
      const toast = await this.toastController.create({
        message: 'User logged out successfully',
        duration: 2000,
        position: 'bottom',
        color: 'warning',
      });
      await toast.present();
      this.router.navigate(['login']);
    });
  }

  async basicSignOut() {
    await signOut(this.auth);
  }
}
