import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PruebaPage } from '../pages/prueba/prueba';
import { MenuPage } from '../pages/menu/menu';
import { CartPage } from '../pages/cart/cart';
import { VercocinaPage } from '../pages/vercocina/vercocina';
import { VercomandaPage } from '../pages/vercomanda/vercomanda';
import { BasketPage } from '../pages/basket/basket';
import { TicketPage } from '../pages/ticket/ticket';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { ServiceProvider } from '../providers/service/service';
import { HttpClientModule} from '@angular/common/http';
import { GlobalService } from '../providers/global/global';
import { PanelPage } from '../pages/panel/panel';
import { AddProductPage } from '../pages/add-product/add-product';
import { AddCategoryPage } from '../pages/add-category/add-category';
import { EditCategoryPage } from '../pages/edit-category/edit-category';
import { ListaCategoriaClientePage } from '../pages/lista-categoria-cliente/lista-categoria-cliente';
import { MenuClientPage } from '../pages/menu-client/menu-client';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { Camera } from '@ionic-native/camera';
import {ManualUserPage} from '../pages/manual-user/manual-user';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    VercocinaPage,
    VercomandaPage,
    PanelPage,
    PruebaPage,
    TicketPage,
    BasketPage,
    CartPage,
    AddProductPage,
    AddCategoryPage,
    EditCategoryPage,
    ListaCategoriaClientePage,
    MenuClientPage,
    EditProductPage,
    ManualUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    VercocinaPage,
    VercomandaPage,
    PanelPage,
    PruebaPage,
    TicketPage,
    BasketPage,
    CartPage,
    AddProductPage,
    AddCategoryPage,
    EditCategoryPage,
    ListaCategoriaClientePage,
    MenuClientPage,
    EditProductPage,
    ManualUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    ServiceProvider,
    PayPal,
    HttpClientModule,
    GlobalService,
    Camera
  ]
})
export class AppModule {}
