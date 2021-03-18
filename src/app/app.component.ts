import { Component } from '@angular/core';
import { Platform, ModalController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { HomePage } from '../pages/home/home';
import { PruebaPage } from '../pages/prueba/prueba';
import { PanelPage } from '../pages/panel/panel';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  showSplash = true; // <-- show animation

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();  // <-- hide static image

      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}

