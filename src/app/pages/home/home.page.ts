import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', '../../app.component.scss'],
})
export class HomePage implements OnInit {
  constructor(private auth: Auth, private route: ActivatedRoute) {}
  uid: any;
  ngOnInit() {
    this.uid = this.auth.currentUser?.email;
  }
}
