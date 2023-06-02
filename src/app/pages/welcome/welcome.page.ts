import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(
    private toastController: ToastController,
    private nav: NavController
  ) {}

  ngOnInit() {}

  async navigate(page: 'login' | 'register') {
    console.log(page);
    this.nav.navigateForward([page]);
  }
}
