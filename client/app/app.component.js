"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Import do core do Angular
var core_1 = require('@angular/core');
var http_1 = require('@angular/http'); //Possibilita realizar requisições a serviços
//Decorator (do TypeScript)
var AppComponent = (function () {
    /*
      Graças ao TypeScritp, não é necessário importar a classe Inject, import { Inject } from '@angular/core', e nem usar a anotação @Inject() com o parâmetro de http, constructor(@Inject(Http) http) {}, para indicar uma injeção de dependência
      
      "O TypeScript não possui esse nome à toa. Podemos tipar estaticamente nossas variáveis e um dos benefícios desse processo é que a checagem de tipos nos ajuda a detectar problemas em tempo de desenvolvimento, inclusive auxiliar editores de textos e IDE's a autocompletarem nosso código. Angular se aproveita da tipagem do TypeScript para identificar nossas dependências, evitando assim o uso de @Inject, que aliás, recebe o tipo de quem queremos injetar como parâmetro. A tipagem com TypeScript consiste em adicionar : (dois pontos) seguido do tipo da variável, isto é, sua classe."
     
     */
    function AppComponent(http) {
        //http.get('v1/fotos') retorna um fluxo observável (observable stream) do RxJS
        var _this = this;
        //'fotos' é uma propriedade de AppComponent, e será um array contendo objetos
        // fotos : Array<Object> = []; //Sintaxe alternativa
        this.fotos = []; //Sintaxe reduzida
        http.get('v1/fotos') //Estabelece uma request do tipo GET, com a url do serviço
            .map(function (res) { return res.json(); })
            .subscribe(function (fotos) {
            _this.fotos = fotos;
            console.log(_this.fotos); //Exibe o array de fotos
        }, function (erro) { return console.log(erro); }); //Exibe um log caso ocorra um erro no subscribe
        //Dica importante: Toda arrow function compartilha o mesmo this léxico de seu escopo pai 
    }
    AppComponent = __decorate([
        //Possibilita realizar requisições a serviços
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: './app.component.html' //O elemento de template do componente
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map