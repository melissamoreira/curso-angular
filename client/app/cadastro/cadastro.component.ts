import { Component, Input } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import{ FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector:  'cadastro',
    templateUrl: './cadastro.component.html'
})

export class CadastroComponent { 

    foto: FotoComponent = new FotoComponent();
    service: FotoService; 
    meuForm: FormGroup;
    router: ActivatedRoute; 
    route: Router;
    mensagem: string = '';
    inclusao: boolean;
    
    constructor (service: FotoService, fb: FormBuilder, 
                 router: ActivatedRoute, route: Router) {

        this.service = service;
        this.router = router;
        this.route = route;

        router.params.subscribe( params => {

                console.log(params);                
                let id =  params['id'];

                if (id) {
                    
                        service
                            .buscar(id)
                            .subscribe(
                                foto => this.foto = foto,
                                erro => console.log(erro)
                            );
                }
            }
        );

        this.meuForm = fb.group({
            titulo: ['', Validators.compose(
                        [Validators.required, Validators.minLength(4)]
                    )],
            url: ['', Validators.required],
            descricao: ['']
        });
    }


    cadastrar(event) {

        event.preventDefault();
        console.log(this.foto);

        this.service.cadastra(this.foto)                    
                    .subscribe( res => {

                        /* Exibindo a mensagem de forma correta, por meio do tipo MensagemCadastro */
                        this.mensagem = res.mensagem;
                        this.foto = new FotoComponent();
                        if(!res.inclusao) this.route.navigate(['']);
                        
                    },  erro => {
                        console.log(erro);
                    });
    }

}