import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {GlobalService} from '../global/global';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

   //api:string = 'http://localhost/qrico-api/'
   //api:string = 'http://qrico.000webhostapp.com/'
    api:string = 'http://qrico.xyz/'

  constructor(public http: HttpClient, public global:GlobalService) {
  }
   
  madeLogin(username,password)
  {
    return this.http.get(this.api+'login.php?username="'+username+'"&password="'+password+'"');
  }

  getCategoriesRestaurant(id)
  {
      return this.http.get(this.api+'categoriesmenu.php?restaurantid='+id);
  }
  getCategoriesRestaurantClient()
  {

      return this.http.get(this.api+'categoriesmenuclient.php?username="'+this.global.getUsername()+'"&password="'+this.global.getPassword()+'"');
  }

  getRealizadaOrder(id){

    let parans = {orderedid:id};
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
      return this.http.post(this.api+"realizadaorder.php",parans).subscribe(data=>{},err=>{})
    
}

getPagadaOrder(id){
    let parans = {orderedid:id};
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
      return this.http.post(this.api+"pagadaorder.php",parans).subscribe(data=>{},err=>{})
}


  getDeleteOrder(id){
  
    return this.http.get(this.api+'deleteorder.php?quantityid='+id);
}

getDeleteOrder2(id){
    let parans = {quantityid:id};
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
      return this.http.post(this.api+"deleteorder.php",parans).subscribe(data=>{},err=>{});
    
}
    getOrdered(username,password){
  
        return this.http.get(this.api+'listaComanda.php?username="'+username+'"&password="'+password+'"');
    }

  getOrderKitchen(username,password){
  
      return this.http.get(this.api+'listaCocina.php?username="'+username+'"&password="'+password+'"');
  }
  getProductsCategory(id)
  {
      return this.http.get(this.api+'productscategory.php?categoryid='+id);
  }
  deleteCategory(categoryId,restaurantId)
  {
    let parans = {categoryId:categoryId,
        restaurantId:restaurantId};
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post(this.api+"categoryDelete.php",parans).subscribe(data=>{},err=>{});
  }
  deleteProduct(productId,restaurantId)
  {
    let parans = {productId:productId,
        restaurantId:restaurantId};
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
      return this.http.post(this.api+"productDelete.php",parans).subscribe(data=>{},err=>{});
  }
 
  editCategory(parans)
  {
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
     return this.http.post(this.api+"categoryEdit.php",parans).subscribe(data=>{},err=>{})
  }

  getRestaurant(restaurantid,tablenumber)
  {
      return this.http.get(this.api+'restaurant.php?restaurantid='+restaurantid+'&tablenumber='+tablenumber);
  }
  getOrderedTable(tableid)
  {
      return this.http.get(this.api+'orderedtable.php?tableid='+tableid);
  }
  getQuantitiesOrdered(orderedid)
  {
      return this.http.get(this.api+'quantitiesordered.php?orderedid='+orderedid);
  }

  getCountQuantitiesOrdered(orderedid)
  {
      return this.http.get(this.api+'countquantitiesordered.php?orderedid='+orderedid);
  }
  insertOrdered(parans)
  {
      let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
      return this.http.post(this.api+"insertordered.php",parans).subscribe(data=>{},err=>{})
 }
 insertProduct(parans)
 {
     let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
     return this.http.post(this.api+"insertProduct.php",parans).subscribe(data=>{},err=>{})
}
editProduct(parans)
 {
     let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
     return this.http.post(this.api+"editProduct.php",parans).subscribe(data=>{},err=>{})
}
addCategory(parans)
 {
    let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
     return this.http.post(this.api+"addCategory.php",parans).subscribe(data=>{},err=>{})
}
    
  

}
