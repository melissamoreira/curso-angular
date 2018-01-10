import { NgModule }      from '@angular/core';
import { FotoComponent }   from './foto.component';
import { FiltroPorTitulo } from './foto.pipes';
import { FotoService } from './foto.service';
  //Import do FotoService no módulo

@NgModule({
  declarations: [ FotoComponent, FiltroPorTitulo ],
  exports: [FotoComponent, FiltroPorTitulo ],
  providers: [FotoService] //Declaramos FotoService como provider!
})
export class FotoModule { }