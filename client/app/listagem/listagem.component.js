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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http"); //Possibilita realizar requisições a serviços
var ListagemComponent = (function () {
    function ListagemComponent(http) {
        var _this = this;
        //Passamos todo o conteúdo inicial de AppComponent para ListagemComponent
        this.fotos = [];
        http.get('v1/fotos')
            .map(function (res) { return res.json(); })
            .subscribe(function (fotos) {
            _this.fotos = fotos;
            console.log(_this.fotos);
        }, function (erro) { return console.log(erro); });
    }
    ListagemComponent = __decorate([
        //Possibilita realizar requisições a serviços
        core_1.Component({
            moduleId: module.id,
            selector: 'listagem',
            templateUrl: './listagem.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListagemComponent);
    return ListagemComponent;
}());
exports.ListagemComponent = ListagemComponent;
//Listagem não possuirá um modulo próprio pois está atrelado ao AppModule, sendo usado apenas nessa aplicação 
//# sourceMappingURL=listagem.component.js.map