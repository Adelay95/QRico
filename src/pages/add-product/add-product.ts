import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceProvider} from '../../providers/service/service';
import {GlobalService} from '../../providers/global/global';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  formulario: FormGroup;
  categories;
  image: string = null;
  camara:boolean=false;
  restaurantId;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public provider: ServiceProvider,
     public alert:AlertController, public formBuilder : FormBuilder, public global:GlobalService, private camera: Camera,
     public platform: Platform) {
      this.provider.getCategoriesRestaurantClient().subscribe((data)=>{this.categories=data;}, (err)=>{console.log(err);});
      this.restaurantId = this.global.getRestaurant()["id"];
      if (this.platform.is('ios')||(this.platform.is('android'))){
      this.formulario=this.crearFormularioMoviles();
      this.camara=true;
     }else{
      this.formulario=this.crearFormulario();
      this.camara=false;
     }
  }

  private crearFormularioMoviles(){
    return this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', [Validators.min(0.0), Validators.required]],
      productQuantity : [''],
      category : ['', Validators.required],
      allergens : ['']
    })
  }
  private crearFormulario(){
    return this.formBuilder.group({
      name : ['', Validators.required],
      price : ['', [Validators.min(0.0), Validators.required]],
      image : [''],
      productQuantity : [''],
      category : ['', Validators.required],
      allergens : ['']
    })
  }

  saveData(){
    let allergens:string='';
    let select:string=this.formulario.controls['allergens'].value;
    let lista:string[]=select.toString().split(",");
    for (var _i = 0; _i < 14; _i++) {
      if(lista.indexOf(String(_i)) > -1){
        allergens=allergens+'1';
      }else{
        allergens=allergens+'0';
      }
     }
    let parans;
    if(this.platform.is('ios')||(this.platform.is('android'))){
        parans = {
          name: this.formulario.controls['name'].value,
          price: this.formulario.controls['price'].value,
          image: this.image,
          productQuantity: this.formulario.controls['productQuantity'].value,
          categoryId: this.formulario.controls['category'].value,
          restaurantId: this.restaurantId,
          allergens: allergens
        };
      
        let res=this.provider.insertProduct(parans);
        this.navCtrl.pop();
        let okalert=this.alert.create({
          message: "Tu producto ha sido añadido",
          buttons: ['Ok']
        });
        okalert.present();
    }else{
        parans = {
          name: this.formulario.controls['name'].value,
          price: this.formulario.controls['price'].value,
          image: this.formulario.controls['image'].value,
          productQuantity: this.formulario.controls['productQuantity'].value,
          categoryId: this.formulario.controls['category'].value,
          restaurantId: this.restaurantId,
          allergens: allergens
        };
        let res=this.provider.insertProduct(parans);
        this.navCtrl.pop();
        let okalert=this.alert.create({
          message: "Tu producto ha sido añadido",
          buttons: ['Ok']
        });
        okalert.present();
      }
  }
  subirImagen(){
    let erroralert = this.alert.create({
      title: 'Añadir imagen',
      message: 'Puede usar la cámara o cargar una imagen de la galería.',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.getPicture(true);
          }
        },
        {
          text: 'Galería',
          handler: () => {
            this.getPicture(false);
          }
        }
      ]
    });
    erroralert.present();
  }
  
  getPicture(camera:boolean){
    let options: CameraOptions;
    if(camera){
     options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
     }
    }else{
       options= {
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType:  this.camera.PictureSourceType.PHOTOLIBRARY, 
        targetWidth: 1000,
        targetHeight: 1000,
        quality: 100
      }
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.formulario.controls['image'].setValue(this.image);
    })
    .catch(error =>{
      console.error( error );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

}
