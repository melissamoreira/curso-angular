//Import do core do Angular
import { Component } from '@angular/core';
import { Http } from '@angular/http'; //Possibilita realizar requisições a serviços

//Decorator (do TypeScript)
@Component({
  moduleId: module.id,
  selector: 'app', //O seletor desse componente
  templateUrl: './app.component.html' //O elemento de template do componente
})
export class AppComponent {
  
  //'fotos' é uma propriedade de AppComponent, e será um array contendo objetos
  // fotos : Array<Object> = []; //Sintaxe alternativa
  fotos : Object[] = []; //Sintaxe reduzida
 
 /*
   Graças ao TypeScritp, não é necessário importar a classe Inject, import { Inject } from '@angular/core', e nem usar a anotação @Inject() com o parâmetro de http, constructor(@Inject(Http) http) {}, para indicar uma injeção de dependência
   
   "O TypeScript não possui esse nome à toa. Podemos tipar estaticamente nossas variáveis e um dos benefícios desse processo é que a checagem de tipos nos ajuda a detectar problemas em tempo de desenvolvimento, inclusive auxiliar editores de textos e IDE's a autocompletarem nosso código. Angular se aproveita da tipagem do TypeScript para identificar nossas dependências, evitando assim o uso de @Inject, que aliás, recebe o tipo de quem queremos injetar como parâmetro. A tipagem com TypeScript consiste em adicionar : (dois pontos) seguido do tipo da variável, isto é, sua classe." 
  
  */
  
  constructor (http: Http) {
    
    //http.get('v1/fotos') retorna um fluxo observável (observable stream) do RxJS

    http.get('v1/fotos') //Estabelece uma request do tipo GET, com a url do serviço
    
        //O rxjs permite tratar o fluxo de resposta como se fosse um array, mas para habilitar o uso da função map, devemos importar a extensão 'rxjs/add/operator/map' em app.module. A resposta que recebemos, res, ainda não é a lista de fotos, mas um objeto no qual solicitamos essa lista de dados no formato que for interessante para nós. Na função map estamos executando a instrução res.json(), que realiza automaticamente o parser para JSON do array de objetos retornado em res. Apesar de não retornarmos um valor no map por meio de um return, a lista já parseada está disponível como o primeiro parâmetro da função subscribe (fotos).
        
        .map(res => res.json())
        
        // A função subscribe posibilita "observar" os dados que são retornados, nesse caso, a resposta do servidor.
        .subscribe(
          
            fotos => {
              this.fotos = fotos;
              console.log(this.fotos); //Exibe o array de fotos
            }, erro => console.log(erro)); //Exibe um log caso ocorra um erro no subscribe
          
          //Dica importante: Toda arrow function compartilha o mesmo this léxico de seu escopo pai 
          
  }
  
  //https://cloud9.readme.io/v1.0/discuss/55e95e4b5faf542500c9d25f
}