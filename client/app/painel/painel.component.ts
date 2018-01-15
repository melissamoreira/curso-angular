import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from "@angular/core";
import { Element } from "@angular/compiler/src/ml_parser/ast";
import { elementAt } from "rxjs/operator/elementAt";
    
@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css'],
    encapsulation: ViewEncapsulation.Emulated 
})

export class PainelComponent implements OnInit {

    @Input () titulo: string;
    private elemento: ElementRef;
        //O ElementRef fornece uma REFERÊNCIA ao elemento nativo do DOM

    constructor(elemento: ElementRef) {
        this.elemento = elemento;            
    }

    ngOnInit () {
        this.titulo = this.titulo.length > 7 
        ? this.titulo.substr(0,7)+'...'
            // `${this.titulo.substr(0, 7)}...`
            // Sintaxe alternativa acima, utilizando o template string do ES6
        : this.titulo;
    }

    fadeOut(callBack) {      

        $(this.elemento.nativeElement).fadeOut(callBack);
            //Contudo, para lidar com o elemento nativo em si, é preciso utilizar o método 'nativeElement' do ElementRef
    }

}
