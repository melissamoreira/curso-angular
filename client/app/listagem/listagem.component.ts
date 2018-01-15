import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FotoService } from '../foto/foto.service';
import { PainelComponent } from '../painel/painel.component';

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent {

    fotos : FotoComponent[] = [];
    service: FotoService;
    mensagem: string = '';

    //O construtor recebe o serviço por parâmetro
    constructor (service: FotoService) {

         this.service = service;  
         this.service.lista()
                     .subscribe(
                        fotos => this.fotos = fotos,
                        erro => console.log(erro)
                     );               
    }

    remove(foto: FotoComponent, painel:PainelComponent) {

        this.service.remove(foto)
                    .subscribe(() => {

                        //Realiza o fadeOut do painel primeiro, para depois concluir a exclusão do elemento

                            painel.fadeOut(() => {

                                let novasFotos = this.fotos.slice(0);
                                let index = novasFotos.indexOf(foto);
                                novasFotos.splice(index, 1);
                                this.fotos = novasFotos;
                                this.mensagem = "Foto removida com sucesso!";
                            });
                    },
                        erro => {
                            console.log( erro );
                            this.mensagem = "Ops! Não foi possível remover a foto.";
                        });
    }
}

/*  
        Change Detection
        ----------------
        Angular só monitora a REFERÊNCIA de this.fotos do nosso componente, e não a lista em si. Se alguém incluir ou remover um novo item da lista ele não saberá. Para isso, precisamos criar uma nova lista e atribuir essa lista a this.fotos. 
        
        Como estamos reatribuindo um valor para a variável o Angular desencadeará seu mecanismo de deteção de mudança e renderizará a view. 
    */