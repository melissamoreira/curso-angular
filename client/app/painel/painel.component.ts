import { Component, Input, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html'
})
export class PainelComponent implements OnInit {

    @Input () titulo: string;
    //Recebe o título via input

    /*
        Se tentássemos realizar a operação abaixo dentro do construtor, ocorreria um erro.
        O problema é que toda property com o decorator Input só recebe os dados associados à propriedade depois da chamada do construtor. Sendo assim, quando tentássemos manipular o título ele ainda estaria undefined.

        A solução do problema mora no entendimento de que componentes em Angular2 possuem ciclos de vida, um deles é chamado de OnInit. Nele, o componente é iniciado, mas só depois das inbound properties terem sido atribuídas, como é o caso do título do nosso painel
    */

    ngOnInit () {
        this.titulo = this.titulo.length > 7 
        ? this.titulo.substr(0,7)+'...'
            // `${this.titulo.substr(0, 7)}...`
            // Sintaxe alternativa acima, utilizando o template string do ES6
        : this.titulo;
    }

    /*
        Componentes criados pelo Angular passam por etapas específicas durante sua construção. O conjunto dessas etapas é chamado de ciclo de vida. Podemos adicionar "ganchos" para que possamos interagir com essas fases. 
        
        Por exemplo, há a fase OnInit executada sempre que um valor de entrada ou de saída acontece. Há outros como OnDestroy executado quando o componente é destruído entre outros. 

        Acima, a classe PainelComponent implementa a interface OnInit, dessa forma, o TS não compilará caso o método ngOnInit() não esteja implementado da forma correta.
    */

}
