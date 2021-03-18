import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {GlobalService} from '../../providers/global/global';
import { BasketPage } from '../basket/basket';
import { TicketPage } from '../ticket/ticket';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  private carritoProductos: any[]=[];
  private carritoCantidad: number[]=[];
  products;
  restaurant;
  category;
  ordered;
  quantities;
  constructor(public navCtrl: NavController, public navParams: NavParams,public global:GlobalService,public provider: ServiceProvider,public alert:AlertController) {
    this.products = this.navParams.get('products');
    this.category = this.navParams.get('category');
    this.restaurant = this.global.getRestaurant();
    this.carritoProductos = this.global.getCarritoProductos();
    this.carritoCantidad = this.global.getCarritoCantidad();
    this.ordered = this.navParams.get('ordered');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  ionViewDidEnter() {
    this.provider.getOrderedTable(this.restaurant.tableid).subscribe((data) => {
      this.ordered = data;
    }, (err) => { 
        this.alertServerError()
  });
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
  checkProdudct(item){
    if(this.global.getIndexProducto(item) != -1){
      return true;
    }else{
      return false;
    }
  }
  getQuantity(item){
   let i= this.global.getIndexProducto(item);
   return this.carritoCantidad[i];
  } 
  addProduct(item){
    this.global.addCarrito(item);
   }
   removeProduct(item){
    this.global.removeCarrito(item);
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
