import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {GlobalService} from '../../providers/global/global';
import {ServiceProvider} from '../../providers/service/service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
  
  pedidos;
  restaurant;
  ordered;
  constructor(public navCtrl: NavController,public alert:AlertController, public navParams: NavParams,public global:GlobalService,private payPal: PayPal, public provider: ServiceProvider) {
    this.restaurant = this.global.getRestaurant();
    this.ordered=this.navParams.get('ordered');
    this.pedidos=this.navParams.get('quantities');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

  pay(){
    let allDone= true;
    for (let pedido of this.pedidos){
      if (pedido["state"] != 1){
          allDone=false;
          break;
      }
    }
    if(allDone){
    this.payPal.init({
      PayPalEnvironmentProduction: 'AXHcgaAZUc1NCbvzmjrh0eTROFPyJT7nlcJP7dxXm6XsPN32S5Kw4Xi5GKykQlgKloHvxqvmI4Mg86QJ',
      PayPalEnvironmentSandbox: 'ARbuA372fMz5HruzzbvKK-tjbBk3Nv1X5b9WfWyJlI2NcSxrFVHtljxHECXsQZ4NdAOdZygznoAKwczS'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.ordered["total"], 'EUR', 'Total de su cuenta.', 'sale');
        payment.payeeEmail = "franciscojavierhigueras@gmail.com";
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
          this.provider.getPagadaOrder(this.ordered["id"]);
          let okalert=this.alert.create({
            message: 'La compra se ha realizado con éxito',
            buttons: ['Ok']
          });
          okalert.present();
          this.navCtrl.pop();
        }, (err3) => {
          // Error or render dialog closed without being successful
          let okalert=this.alert.create({
            message: 'Ha ocurrido un error durante la compra 1'+ JSON.stringify(err3),
            buttons: ['Ok']
          });
          okalert.present();
        });
      }, (err2) => {
        // Error in configuration
        let okalert=this.alert.create({
          message: 'Ha ocurrido un error durante la compra 2'+ JSON.stringify(err2),
          buttons: ['Ok']
        });
        okalert.present();
      });
    }, (err) => {
      // Error in initialization, maybe PayPal isn't supported or something else
      let okalert=this.alert.create({
        message: 'Ha ocurrido un error durante la compra 3'+ JSON.stringify(err),
        buttons: ['Ok']
      });
      okalert.present();
    });
  }else{
    let okalert=this.alert.create({
      message: 'Para pagar, todos sus platos deben haber llegado a la mesa',
      buttons: ['Ok']
    });
    okalert.present();
  }
  }
}
