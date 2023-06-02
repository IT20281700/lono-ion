import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }
  logout() {
    this.authService.logout();
  }
}
