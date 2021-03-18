import { Component, Provider } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {GlobalService} from '../../providers/global/global';
/**
 * Generated class for the VercomandaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vercomanda',
  templateUrl: 'vercomanda.html',
})
export class VercomandaPage {

  comanda

  constructor(public navCtrl: NavController, public navParams: NavParams,public provider: ServiceProvider,public global:GlobalService,private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

    this.provider.getOrdered(this.global.getUsername(),this.global.getPassword()).subscribe((data)=>{this.comanda=data;}, (err)=>{console.log(err);});
  }

  realizado(item){
    this.provider.getRealizadaOrder(item);
    this.navCtrl.push(VercomandaPage).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

  pagado(item){
    this.provider.getPagadaOrder(item);
    this.navCtrl.push(VercomandaPage).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }
  UpdateList(){
    this.navCtrl.push(VercomandaPage).then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }
}
