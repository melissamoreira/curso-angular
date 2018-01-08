import { Component, Input } from '@angular/core';

@Component({
    //O moduleId faz com que o componente procure o template relativo à sua pasta.
    moduleId: module.id,
    selector: 'foto',
    templateUrl : './foto.component.html'
})
export class FotoComponent { 
    
    //A notação @Input define que esses parâmetros serão recebidos como atributos no seletor
    //'Inbound properties', isto é, aceitam receber dados através do decorator @Input()
    @Input() titulo: string = '';
    @Input() url: string = '';
    descricao: string = '';

    //Cada propriedade é inicializada com uma string vazia para evitar que o formulário seja carregado com o valor undefined nos campos
}