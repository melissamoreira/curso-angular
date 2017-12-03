import { Component, Input } from "@angular/core";
import { Http } from "@angular/http"; //Possibilita realizar requisições a serviços

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent { 

    //Passamos todo o conteúdo inicial de AppComponent para ListagemComponent

    fotos : Object[] = [];

    constructor (http: Http) {
     
     http.get('v1/fotos') 
         .map(res => res.json())
         .subscribe(
           
             fotos => {
               this.fotos = fotos;
               console.log(this.fotos);
             }, erro => console.log(erro));
           
    }

}
//Listagem não possuirá um modulo próprio pois está atrelado ao AppModule, sendo usado apenas nessa aplicação