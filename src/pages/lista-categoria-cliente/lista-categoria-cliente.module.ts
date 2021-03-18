import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaCategoriaClientePage } from './lista-categoria-cliente';

@NgModule({
  declarations: [
    ListaCategoriaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCategoriaClientePage),
  ],
})
export class ListaCategoriaClientePageModule {}
