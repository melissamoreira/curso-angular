import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
    //Import do ViewEncapsulation para possibilitar explicitar o tipo de encapsulamento

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css'],
    encapsulation: ViewEncapsulation.Emulated 
})
    /*  
        O 'styleUrls' especifica um array com os paths para todas as folhas de estilo usadas por tal componente. 
    
        Já 'encapsulation' especifica o tipo de encapsulamento que ocorre no componente. O padrão é Emulated, onde é emulado o Shadow Dom, mas também há as opções Native, que utiliza o Shadow Dom nativo do navegador (essa opção não é totalmente segura porque há navegadores que ainda não suportam completamente alguns recursos), e a opção NONE, onde não ocorre encapsulamento e todo o estilo permanece global. */

export class PainelComponent implements OnInit {

    @Input () titulo: string;

    ngOnInit () {
        this.titulo = this.titulo.length > 7 
        ? this.titulo.substr(0,7)+'...'
            // `${this.titulo.substr(0, 7)}...`
            // Sintaxe alternativa acima, utilizando o template string do ES6
        : this.titulo;
    }

}
