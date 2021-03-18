import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the PruebaCodigoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prueba-codigo',
  templateUrl: 'prueba-codigo.html',
})
export class PruebaCodigoPage {
qrData=null;
createdCode=null;
scannedCode=null;
  constructor(private barcodeScanner: BarcodeScanner) {
  }

  
  createCode(){
    this.createdCode=this.qrData;
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {this.scannedCode=barcodeData.text;})
  }
}
