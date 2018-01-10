import { Component, Input } from '@angular/core';
import { FotoService } from '../foto/foto.service'; 
import { error } from 'util';
    //Import do nosso serviço

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {

    fotos : Object[] = [];

    //O construtor recebe o serviço por parâmetro
    constructor (service: FotoService) {

         service.lista()
                .subscribe(
                    fotos => this.fotos = fotos,
                    erro => console.log(erro)
                );
               
    }

}