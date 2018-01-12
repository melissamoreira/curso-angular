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
    router: ActivatedRoute; //Define a parametrização de rotas
    route: Router;          //Define rotas e navegação
    
    constructor (service: FotoService, fb: FormBuilder, 
                 router: ActivatedRoute, route: Router) {

        this.service = service;
        this.router = router;
        this.route = route;

        router.params.subscribe( params => {

                console.log(params);                
                let id =  params['id'];
                        //params é um Object, como por exembplo: { id: "6MQ0svcLil1zCQGx" }

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

        let put = (this.foto._id)
                ? this.route.navigate(['/'])
                : false;
                //Navega de volta para a home e for alteração, senão, permanece na página do formulário.

        //Utilizando o serviço
        this.service
                .cadastra(this.foto)                    
                .subscribe( () => {

                    this.foto = new FotoComponent();
                    console.log("Foto salva com sucesso!");
                    put;
                    
                },  erro => console.log(erro));
    }

}