import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {GlobalService} from '../../providers/global/global';
import {ServiceProvider} from '../../providers/service/service';


/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {
  private carritoProductos: any[]=[];
  private carritoCantidad: number[]=[];
           restaurant;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalService, public provider: ServiceProvider,public alert:AlertController) {
    this.restaurant = this.global.getRestaurant();
    this.carritoProductos = this.global.getCarritoProductos();
    this.carritoCantidad = this.global.getCarritoCantidad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage');
  }
  getQuantity(item){
    let i= this.global.getIndexProducto(item);
    return this.carritoCantidad[i];
   } 
   getTotalCarrito(){
    return this.global.getTotalCarrito();
  }
  sendOrdered(){
 
    let parans = {
      products: this.carritoProductos,
      quantities: this.carritoCantidad,
      totalprice: this.getTotalCarrito(),
      mesaid: this.restaurant.tableid
    };
    let res=this.provider.insertOrdered(parans);
    this.global.resetCarrito();
    this.navCtrl.pop();
    let okalert=this.alert.create({
      message: 'Tu pedido ha sido realizado',
      buttons: ['Ok']
    });
    okalert.present();
  }
  
}
