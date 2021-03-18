import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServiceProvider} from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import {GlobalService} from '../../providers/global/global';
/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  formulario: FormGroup;
  product;
  category;
  categories;
  image: string = null;
  camara:boolean=false;
  restaurantId;
  alerg:number[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController, public formBuilder : FormBuilder,
    public provider: ServiceProvider, private camera: Camera,public platform: Platform, public global:GlobalService) {
    this.product = this.navParams.get('product');
    this.category = this.navParams.get('category');
    this.provider.getCategoriesRestaurantClient().subscribe((data)=>{this.categories=data;}, (err)=>{console.log(err);});
    this.formulario=this.crearFormulario();
    this.restaurantId = this.global.getRestaurant()["id"];
    this.image= this.product.image;
    for (var _i = 0; _i < 14; _i++) {
      if(this.product.allergens.substring(_i,_i+1)=='1'){
        this.alerg.push(_i);
      }
     }


    if (this.platform.is('ios')||(this.platform.is('android'))){
      this.formulario=this.crearFormularioMoviles();
      this.camara=true;
     }else{
      this.formulario=this.crearFormulario();
      this.camara=false;
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }
  private crearFormularioMoviles(){
    return this.formBuilder.group({
      name : [this.product.name, Validators.required],
      price : [this.product.price, [Validators.min(0.0), Validators.required]],
      productQuantity : [this.product.productquantity],
      category : [this.category.id, Validators.required],
      allergens : [this.alerg]
    })
  }
  private crearFormulario(){
    return this.formBuilder.group({
      name : [this.product.name, Validators.required],
      price : [this.product.price, [Validators.min(0.0), Validators.required]],
      image : [''],
      productQuantity : [this.product.productquantity],
      category : [this.category.id, Validators.required],
      allergens : ['']
    })
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
          id: this.product.id,
          name: this.formulario.controls['name'].value,
          price: this.formulario.controls['price'].value,
          image: this.image,
          productQuantity: this.formulario.controls['productQuantity'].value,
          categoryId: this.formulario.controls['category'].value,
          restaurantId: this.restaurantId,
          allergens: allergens
        };
      
        let res=this.provider.editProduct(parans);
        this.navCtrl.pop();
        this.navCtrl.pop();
        let okalert=this.alert.create({
          message: "Tu producto ha sido editado",
          buttons: ['Ok']
        });
        okalert.present();
      
    }else{
        parans = {
          id: this.product.id,
          name: this.formulario.controls['name'].value,
          price: this.formulario.controls['price'].value,
          image: this.formulario.controls['image'].value,
          productQuantity: this.formulario.controls['productQuantity'].value,
          categoryId: this.formulario.controls['category'].value,
          restaurantId: this.restaurantId,
          allergens:allergens
        };
        let res=this.provider.editProduct(parans);
        this.navCtrl.pop();
        this.navCtrl.pop();
        let okalert=this.alert.create({
          message: "Tu producto ha sido editado",
          buttons: ['Ok']
        });
        okalert.present();
   }
  }
  
 
}
