import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'foto',
    templateUrl : './foto.component.html',
    styleUrls: ['./foto.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
    /* Utilizando o encapsulamento não ocorre o vazamento de um estilo fora de seu componente e não há necessidade de super-especificar um seletor. */

export class FotoComponent { 
    @Input() titulo: string = '';
    @Input() url: string = '';
    descricao: string = '';

}