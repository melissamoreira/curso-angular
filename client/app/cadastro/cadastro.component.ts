import { Component, Input } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';

@Component({
    moduleId: module.id,
    selector:  'cadastro',
    templateUrl: './cadastro.component.html'
})

export class CadastroComponent { 

    foto: FotoComponent = new FotoComponent();
    //Cria uma instancia de FotoComponent em cada novo cadastro

    http: Http; 
    //Cria uma propriedade http do tipo Http na classe

    constructor (http: Http) {
        this.http = http;
    }

    cadastrar(event) {
        event.preventDefault(); //Evita o submit do form
        console.log(this.foto);

        // cria uma instância de Headers
        let headers = new Headers;

        // Adiciona o tipo de conteúdo application/json
        headers.append('Content-type', 'application/json');

        //Abaixo, no método post do http, o primeiro parâmetro é a URL da requisição, o segundo é o objeto de dados a ser inserido via post, devidamente parseado para Json, e o terceiro é o objeto de configuração do header da requisição.
        //Muita atenção, porque não passamos nosso objeto headers diretamente. Passamos um objeto de configuração com a propriedade headers que o contém como valor.
        
        this.http.post('v1/fotos', JSON.stringify(this.foto), { headers: headers })
                 .subscribe(() => {
                     this.foto = new FotoComponent();
                     console.log("Foto salva com sucesso!");
                 }, error => console.log(error));        
    }

        //O método subscribe é utilizado novamente acima para, caso haja o sucesso no envio, inserir um novo FotoComponent com atributos em branco nos campos do formulário e exibir uma mensagem de sucesso no console (provisóriamente), caso haja erro, o erro será exibido no console.

}

//Cadastro não possuirá um modulo próprio pois está atrelado ao AppModule, sendo usado apenas nessa aplicação