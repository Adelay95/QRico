import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import { EditProductPage } from '../edit-product/edit-product';
import {GlobalService} from '../../providers/global/global';
/**
 * Generated class for the MenuClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-client',
  templateUrl: 'menu-client.html',
})
export class MenuClientPage {
  products;
  category;
  restaurantId;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController,public provider: ServiceProvider,
    private viewCtrl: ViewController, public global:GlobalService) {
    this.products = this.navParams.get('products');
    this.category = this.navParams.get('category');
    this.restaurantId = this.global.getRestaurant()["id"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuClientPage');
  }
  editProduct(product){
    this.navCtrl.push(EditProductPage,{
      product : product,
      category : this.category
    });
  }


  deleteProductConfirmed(product){
    let res=this.provider.deleteProduct(product.id,this.restaurantId);

    this.provider.getProductsCategory(this.category.id).subscribe((data) => {
      this.products = data;
      this.navCtrl.pop();

      let okalert=this.alert.create({
        message: "Tu producto ha sido eliminado",
        buttons: ['Ok']
      });
      okalert.present();

          ;} , (err) => { 
            //Error
      });

  }

  deleteProduct(product) {
    let alert = this.alert.create({
      title: 'Confirmar borrado de producto',
      message: '¿Está seguro de borrar el producto '+product.name+'?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteProductConfirmed(product);
          }
        }
      ]
    });
    alert.present();
  }
}
