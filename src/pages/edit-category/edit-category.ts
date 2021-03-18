import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {ServiceProvider} from '../../providers/service/service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  formulario: FormGroup;
  category;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: ServiceProvider,
    public alert:AlertController, public formBuilder : FormBuilder) {
      this.category = this.navParams.get('category');
      this.formulario=this.crearFormulario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
  }

  private crearFormulario(){
    return this.formBuilder.group({
      name : [this.category.name, Validators.required]
    });
  }
  saveData(){
    let parans = {
      name: this.formulario.controls['name'].value,
      category: this.category.id
    };
    this.provider.editCategory(parans);
    let okalert=this.alert.create({
      message: "Su categoría ha sido modificada",
      buttons: ['Ok']
    });
    okalert.present();
    this.navCtrl.pop();
  
  }

}
