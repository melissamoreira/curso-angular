import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component ({
    moduleId: module.id,
    selector: "botao",
    templateUrl: './botao.component.html'

})
export class BotaoComponent {

    @Input() nome: string ='OK';                //Texto do botão
    @Input() estilo: string = 'btn-default';    //Classes CSS
    @Input() tipo: string = 'button';           //'type'
    @Input() desabilitado: boolean = false;     //'disabled'
    @Input() confirmacao: boolean = false;     //Se requer confirmação
    @Output() acao = new EventEmitter();       //Evento


    //Se confirmacao for true, é solicitada a confirmação para prosseguir com a ação, senão, efetua a ação diretamente.

    executaAcao() {

        if(this.confirmacao) {
            if (confirm("Confirma a exclusão desse item?")) {
                this.acao.emit(null);
            }
            return;
        }
        this.acao.emit(null);
    }

}