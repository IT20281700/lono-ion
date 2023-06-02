import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your email address.' },
      {
        type: 'pattern',
        message: 'The email entered is incorrect. Try again.',
      },
    ],
    password: [
      { type: 'required', message: 'Please enter password.' },
      {
        type: 'minlength',
        message: 'The password must be at least 5 characters or more.',
      },
    ],
  };
  validationFormUser: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private menuCtrl: MenuController
  ) {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  async LoginUser(data: any) {
    console.log('Am logged in');
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.authentication(data);
    await loading.dismiss();

    if (user) {
      // login toast
      const toast = await this.toastController.create({
        message: 'User logged in successfully',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
      this.router.navigate(['tabs']);
    } else {
      const toast = await this.toastController.create({
        message: "Login failed', 'Please try again!",
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }
}
