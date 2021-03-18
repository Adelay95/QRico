import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
import {ManualUserPage} from '../manual-user/manual-user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {ServiceProvider} from '../../providers/service/service';
import {GlobalService} from '../../providers/global/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  restaurant=null;
  categories=null;
  qrData=null;
  scannedCode=null;
  ordered=null;
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, public provider: ServiceProvider, public alert:AlertController, public global:GlobalService) {

  }
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  goToManual(){
    this.navCtrl.push(ManualUserPage);
  }
  goToMenu(){
    
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode=barcodeData.text.split(":", 2);
        if(this.scannedCode!=null && this.scannedCode!=''){
          //Cambiar por el id
          this.provider.getCategoriesRestaurant(this.scannedCode[0]).subscribe((data) => {
            this.categories = data;
              this.provider.getRestaurant(this.scannedCode[0],this.scannedCode[1]).subscribe((data) => {
                this.restaurant = data;
                if(this.restaurant.restaurantid==''){
                  this.errorAlertQR();
                }else{
                  this.provider.getOrderedTable(this.restaurant.tableid).subscribe((data) => {
                    this.ordered=data;
                  if(this.global.getRestaurant()==null || this.restaurant.restaurantid!=this.global.getRestaurant().restaurantid || this.restaurant.tableid!=this.global.getRestaurant().tableid){
                    this.global.resetCarrito();
                  }
                  this.global.setRestaurant(this.restaurant);
                  this.navCtrl.push(MenuPage,{
                    id: this.scannedCode,
                    categories: this.categories,
                    ordered: this.ordered
                  });
                } , (err) => {
                  this.errorAlertQR();
              });
                }
                
              }, (err) => { 
                this.errorAlertQR();
            });
            } , (err) => { 
              this.errorAlertQR();
        });
        }
        
      }, (err) => {
        // Error
    });
  }
  goToMenu2(){
    this.provider.getCategoriesRestaurant(7).subscribe((data) => {
      this.categories = data;
        this.provider.getRestaurant(7,1).subscribe((data) => {
          this.restaurant = data;
          if(this.restaurant.restaurantid==''){
            this.errorAlertQR();
          }else{
            this.provider.getOrderedTable(this.restaurant.tableid).subscribe((data) => {
              this.ordered=data;
            if(this.global.getRestaurant()==null || this.restaurant.restaurantid!=this.global.getRestaurant().restaurantid || this.restaurant.tableid!=this.global.getRestaurant().tableid){
              this.global.resetCarrito();
            }
            this.global.setRestaurant(this.restaurant);
            this.navCtrl.push(MenuPage,{
              id: this.scannedCode,
              categories: this.categories,
              ordered: this.ordered
            });
          } , (err) => {
            this.errorAlertQR();
        });
          }
          
        } , (err) => { 
          this.errorAlertQR();
      });
      } , (err) => { 
        this.errorAlertQR();
  });
  }
      errorAlertQR(){
        let scannererror=this.alert.create({
          title:'Error',
          message: 'El código QR no es válido',
          buttons: ['Ok']
        });
        scannererror.present();
      }
      
}
