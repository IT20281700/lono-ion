import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private toastController: ToastController
  ) {}
}
