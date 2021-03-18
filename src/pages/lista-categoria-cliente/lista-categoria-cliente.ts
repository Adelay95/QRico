import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController,ViewController} from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {EditCategoryPage} from '../edit-category/edit-category';
import {AddCategoryPage} from '../add-category/add-category';
import {GlobalService} from '../../providers/global/global';
import { MenuClientPage } from '../menu-client/menu-client';



/**
 * Generated class for the ListaCategoriaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-categoria-cliente',
  templateUrl: 'lista-categoria-cliente.html',
})
export class ListaCategoriaClientePage {
  restaurantId;
  categories;
  products;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController, public provider: ServiceProvider, public alert:AlertController,
     public global:GlobalService) {
   // this.provider.getCategoriesRestaurantClient().subscribe((data)=>{this.categories=data;}, (err)=>{console.log(err);});
   this.restaurantId = this.global.getRestaurant()["id"];
  }

  
  select(category){
    this.provider.getProductsCategory(category.id).subscribe((data) => {
      this.products = data;
          this.navCtrl.push(MenuClientPage,{
            products: this.products,
            category: category
          });} , (err) => { 
            this.alertServerError()
      });
    }

    editCategory(category){
      this.navCtrl.push(EditCategoryPage,{
        category : category
      });
    }

    addCategory(){
      this.navCtrl.push(AddCategoryPage);
    }

    deleteCategoryConfirmed(category){
      let res=this.provider.deleteCategory(category.id,this.restaurantId);
  
      
        this.navCtrl.push(ListaCategoriaClientePage).then(() => {
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });
  
        let okalert=this.alert.create({
          message: "Su categoría ha sido eliminada",
          buttons: ['Ok']
        });
        okalert.present();
  
    }
  
    deleteCategory(category) {
      let alert = this.alert.create({
        title: 'Confirmar borrado de categoría',
        message: '¿Está seguro de borrar la categoría '+category.name+'? Se borrarán todos los productos asociados a ella.',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.deleteCategoryConfirmed(category);
            }
          }
        ]
      });
      alert.present();
    }

    alertServerError(){
      let alert=this.alert.create({
        title:'Error',
        message: 'No se ha podido conectar con el servidor',
        buttons: ['Ok']
      });
      alert.present();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCategoriaClientePage');
  }
  ionViewDidEnter() {
    this.provider.getCategoriesRestaurantClient().subscribe((data)=>{this.categories=data;}, (err)=>{console.log(err);});
  }

}
