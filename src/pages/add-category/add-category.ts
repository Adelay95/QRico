import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {GlobalService} from '../../providers/global/global';

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

  formulario: FormGroup;
  restaurant;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: ServiceProvider,
    public alert:AlertController, public formBuilder : FormBuilder, public global:GlobalService) {
      this.restaurant = this.global.getRestaurant()["id"];
      this.formulario=this.crearFormulario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  private crearFormulario(){
    return this.formBuilder.group({
      name : ['', Validators.required]
    });
  }

  saveData(){
 
    let parans = {
      name: this.formulario.controls['name'].value,
      restaurant: this.restaurant
    };
    this.provider.addCategory(parans);
    let okalert=this.alert.create({
      message: "Su categoría ha sido creada",
      buttons: ['Ok']
    });
    okalert.present();
    this.navCtrl.pop();
  }

}
