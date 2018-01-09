import { Component, Input } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import{ FormGroup, FormBuilder, Validators } from '@angular/forms';
    //Import das classes FormGroup, que representa um grupo de campos, FormBuilder, que permite criar instâncias de FormGroup e Validators que permite realizar as validações

@Component({
    moduleId: module.id,
    selector:  'cadastro',
    templateUrl: './cadastro.component.html'
})

export class CadastroComponent { 

    foto: FotoComponent = new FotoComponent();
    http: Http; 
    meuForm: FormGroup; //Instância do FormGroup

    /*
        Angular nos permite agrupar vários campos (FormControl) dentro de um grupo (FormGroup). Essa maneira de agrupar controles é interessante, porque podemos perguntar ao grupo se ele esta válido (se todos os controles estão válidos) ou se é inválido (se um dos controles for inválido).
    */

    constructor (http: Http, fb: FormBuilder) {
                //Injetando as classes Http e FormBuilder em instâncias

        this.http = http;

            //Utilizando o método group do FormBuilder fb é possível criar a validação para um ou mais campos
        this.meuForm = fb.group({
            titulo: ['', Validators.compose(
                        [Validators.required, Validators.minLength(4)]
                    )],
            url: ['', Validators.required],
            descricao: ['']
        });

        /*  
            Veja que o método group recebe um objeto JavaScript onde a chave é o identificador do campo e seu valor um array com configurações de validação. Usamos a chave titulo para indicar que estamos validando o campo título e assim por diante. O identificador do campo corresponde ao atributo 'formControlName' inserido diretamente no template.   

            IMPORTANTE: Mesmo os campos que não possuirão validação devem constar no obj em group, e também devem possuir o atributo 'formControlName'! 
         */
         
        /*  
            Utilizando o método compose() de Validators, é possível definir mais de um validador para o campo. No caso de titulo, foi aplicado o required e um minLentgh de 4 caracteres. */
    }

    cadastrar(event) {
        event.preventDefault();
        console.log(this.foto);
        let headers = new Headers;
        headers.append('Content-type', 'application/json');
        this.http.post('v1/fotos', JSON.stringify(this.foto), { headers: headers })
                 .subscribe(() => {
                     this.foto = new FotoComponent();
                     console.log("Foto salva com sucesso!");
                 }, error => console.log(error));        
    }

}

//Cadastro não possuirá um modulo próprio pois está atrelado ao AppModule, sendo usado apenas nessa aplicação