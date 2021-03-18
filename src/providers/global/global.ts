import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
private username=null;
private password=null;
  private carritoProductos: any[]=[];
  private carritoCantidad: number[]=[];
  private restaurant=null;


  getUsername()
  {
      return this.username;
  }
  
  setUsername(item)
  {
      this.username=item;
  }
  getPassword()
  {
      return this.password;
  }
  
  setPassword(item)
  {
      this.password=item;
  }
  getCarritoCantidad()
  {
      return this.carritoCantidad;
  }
  getCarritoProductos()
  {
      return this.carritoProductos;
  }
  getCantidadCarrito()
  {
      let res=0;
      if(this.carritoCantidad!=[]){
        this.carritoCantidad.forEach((i) => {
            res=res+i;
      });
     }
    return res;
  }
  getTotalCarrito()
  {
      let res=0;
      if(this.carritoProductos!=[]){
        this.carritoProductos.forEach((product) => {
            res=res+(product.price*this.carritoCantidad[this.getIndexProducto(product)]);
      });
     }
    return res;
  }
  getRestaurant()
  {
      return this.restaurant;
  }
  resetCarrito()
  {
     this.carritoProductos=[];
     this.carritoCantidad=[];
  }
  setRestaurant(item)
  {
      this.restaurant=item;
  }
  getIndexProducto(item){
      if( this.carritoProductos==[]){
          return -1;
      }else{
          return this.carritoProductos.findIndex(myObj => myObj.id == item.id);
      }
  }
  addCarrito(item)
  {
     let i= this.getIndexProducto(item);
     if(i!=-1){
        this.carritoCantidad[i]=this.carritoCantidad[i]+1;
        
     }else{
        this.carritoProductos.push(item);
        this.carritoCantidad.push(1);
    }
  }
  
  removeCarrito(item)
  {
    let i= this.getIndexProducto(item);
    if(i!=-1){
       if(this.carritoCantidad[i]>0){
       this.carritoCantidad[i]= this.carritoCantidad[i]-1;
     }
    }
  }
}