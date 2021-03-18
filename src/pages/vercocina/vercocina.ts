import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {GlobalService} from '../../providers/global/global';
/**
 * Generated class for the VercocinaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vercocina',
  templateUrl: 'vercocina.html',
})
export class VercocinaPage {
  bebidas;
   cocina;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: ServiceProvider,public global:GlobalService,private viewCtrl: ViewController) {
    this.bebidas = this.navParams.get('bebidas');
    this.provider.getOrderKitchen(this.global.getUsername(),this.global.getPassword()).subscribe((data)=>{this.cocina=data;}, (err)=>{console.log(err);});
    
  }

  ionViewDidLoad() {

    
  }

  delete(item){

    this.provider.getDeleteOrder2(item);
    this.navCtrl.push(VercocinaPage).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });

  }
  
  UpdateList(){
    this.navCtrl.push(VercocinaPage).then(() => {
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
      });

  }
}
