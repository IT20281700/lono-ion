import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmedValidator } from 'src/app/services/validator/confirmed.validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  selectedBD!: string;
  maxDate: any = new Date(Date.now());
  validationFormRegister: FormGroup = new FormGroup({});

  validationFormRegisterMessage = {
    user_title: [{ type: 'required', message: 'Please select your Title.' }],
    firstname: [{ type: 'required', message: 'Please enter your First Name.' }],
    lastname: [{ type: 'required', message: 'Please enter your Last Name.' }],
    bdate: [{ type: 'required', message: 'Please select your birth date.' }],
    email: [
      {
        type: 'required',
        message: 'Please enter a valid email as username.',
      },
      {
        type: 'pattern',
        message: 'The email entered is incorrect. Try again.',
      },
    ],
    password: [
      { type: 'required', message: 'Password is required!' },
      {
        type: 'minlength',
        message: 'The password must be at least 5 characters or more.',
      },
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm your password!' },
      {
        type: 'confirmedValidator',
        message: 'Password and confirm password must be match!',
      },
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.validationFormRegister = this.formBuilder.group(
      {
        user_title: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        firstname: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        lastname: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        bdate: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[a-zA-z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(5)])
        ),
        confirm_password: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password'),
      }
    );

    // set max date
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.maxDate = formatDate(this.maxDate, 'yyyy-MM-dd', 'en');
    console.log(this.maxDate);
  }

  ngOnInit() {}

  async RegisterUser(data: any) {
    this.authService
      .register(data)
      .then(async (res) => {
        const toast = await this.toastController.create({
          message:
            'User registration successfully, Please login with your credentials',
          duration: 2000,
          position: 'bottom',
          color: 'success',
        });
        await toast.present();
        this.authService.logout();
      })
      .catch(async (err) => {
        console.log(err);
        const toast = await this.toastController.create({
          message: err.message,
          duration: 2000,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
      });
  }
}
