import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { VercocinaPage } from '../vercocina/vercocina';
import { VercomandaPage } from '../vercomanda/vercomanda';
import { AddProductPage } from '../add-product/add-product';
import { ListaCategoriaClientePage } from '../lista-categoria-cliente/lista-categoria-cliente';

/**
 * Generated class for the PanelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html',
})
export class PanelPage {
variable;
  constructor(public navCtrl: NavController, public alert:AlertController,public navParams: NavParams) {
    this.variable = this.navParams.get('variable2');
  }

  goToCocina(){
    this.navCtrl.push(VercocinaPage,{
      bebidas: false
    });
  
   }
   goToBebidas(){
    this.navCtrl.push(VercocinaPage,{
      bebidas: true
    });
  
   }
   goToBarra(){
    this.navCtrl.push(VercomandaPage);
  
   }

   goToAddProduct(){
    this.navCtrl.push(AddProductPage);
   }

   goToListCategory(){
      
      this.navCtrl.push(ListaCategoriaClientePage);
    
   }
}
