import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PruebaPage } from '../prueba/prueba';
import {ServiceProvider} from '../../providers/service/service';
import { HomePage } from '../home/home';
import { PanelPage } from '../panel/panel';
import {GlobalService} from '../../providers/global/global';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  variable;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: ServiceProvider,public global:GlobalService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  variable2;
  madeLogin(username, password){
   //  alert(username + " y su polla " + password);
 //   alert(String(this.provider.madeLogin(username,password)))
   // if(String(this.variable)==username){
     this.provider.madeLogin(username,password).subscribe((data)=> {
       this.variable2=data;
       if (this.variable2["nameRestaurant"] == "") {
        alert("Usted no esta registrado");
        this.navCtrl.push(HomePage,{variable2:this.variable2});
    }else{
      this.global.setUsername(username);
      this.global.setPassword(password);
      this.global.setRestaurant(this.variable2);
      this.navCtrl.push(PanelPage,{variable2:this.variable2});
    }
       
     }, (err) => { 
      alert("Error");});
      
   //}else{
    // this.navCtrl.push(HomePage)
  // }
   
    //  this.navCtrl.push(PanelPage);
   //}else{
   //  this.navCtrl.push(HomePage)
  // }
   
  }


}


