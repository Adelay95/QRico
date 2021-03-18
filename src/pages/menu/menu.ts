import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ServiceProvider} from '../../providers/service/service';
import { CartPage } from '../cart/cart';
import { BasketPage } from '../basket/basket';
import { TicketPage } from '../ticket/ticket';
import { ManualUserPage } from '../manual-user/manual-user';
import {GlobalService} from '../../providers/global/global';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  scannedCode=null;
  restaurant;
  categories;
  products;
  ordered;
  quantities;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: ServiceProvider, public alert:AlertController,public global:GlobalService) {
    this.scannedCode = this.navParams.get('id');
    this.categories = this.navParams.get('categories');
    this.ordered = this.navParams.get('ordered');
    this.restaurant = this.global.getRestaurant();
    
  }
getCantidadCarrito(){
  return this.global.getCantidadCarrito();
}
getCantidadTicket(){
  if(this.ordered==null || this.ordered.quantitiescount==''){
    return 0;
  }else{
    return this.ordered.quantitiescount;
  }
 
}
ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  ionViewDidEnter() {

    this.provider.getOrderedTable(this.restaurant.tableid).subscribe((data) => {
      this.ordered = data;
    }, (err) => { 
        this.alertServerError()
  });
  }
  goToBasket(){
    if(this.getCantidadCarrito()>0){
    this.navCtrl.push(BasketPage);
    }else{
      let carritoalert=this.alert.create({
        message: 'No tienes nada en el carrito',
        buttons: ['Ok']
      });
      carritoalert.present();
    }
  }
  goToManual(){
    this.navCtrl.push(ManualUserPage);
  }
  goToCategory(category){
    this.provider.getProductsCategory(category.id).subscribe((data) => {
      this.products = data;
          this.navCtrl.push(CartPage,{
            products: this.products,
            category: category,
            ordered: this.ordered
          });} , (err) => { 
            this.alertServerError()
      });
    }
   
      goToTicket(){
        this.provider.getOrderedTable(this.restaurant.tableid).subscribe((data) => {
          this.ordered = data;
          this.provider.getQuantitiesOrdered(this.ordered.id).subscribe((data) => {
            this.quantities=data;
                this.navCtrl.push(TicketPage,{
                  ordered: this.ordered,
                  quantities: this.quantities
                });} , (err) => { 
                  this.alertServerError()
            });} , (err) => { 
                this.alertServerError()
          });
        }
      alertServerError(){
        let alert=this.alert.create({
          title:'Error',
          message: 'No se ha podido conectar con el servidor',
          buttons: ['Ok']
        });
        alert.present();
      }
}
