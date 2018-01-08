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
var core_1 = require('@angular/core');
var foto_component_1 = require('../foto/foto.component');
var http_1 = require('@angular/http');
var CadastroComponent = (function () {
    //Cria uma propriedade http do tipo Http na classe
    function CadastroComponent(http) {
        this.foto = new foto_component_1.FotoComponent();
        this.http = http;
    }
    CadastroComponent.prototype.cadastrar = function (event) {
        var _this = this;
        event.preventDefault(); //Evita o submit do form
        console.log(this.foto);
        // cria uma instância de Headers
        var headers = new http_1.Headers;
        // Adiciona o tipo de conteúdo application/json
        headers.append('Content-type', 'application/json');
        //Abaixo, no método post do http, o primeiro parâmetro é a URL da requisição, o segundo é o objeto de dados a ser inserido via post, devidamente parseado para Json, e o terceiro é o objeto de configuração do header da requisição.
        //Muita atenção, porque não passamos nosso objeto headers diretamente. Passamos um objeto de configuração com a propriedade headers que o contém como valor.
        this.http.post('v1/fotos', JSON.stringify(this.foto), { headers: headers })
            .subscribe(function () {
            _this.foto = new foto_component_1.FotoComponent();
            console.log("Foto salva com sucesso!");
        }, function (error) { return console.log(error); });
    };
    CadastroComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cadastro',
            templateUrl: './cadastro.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CadastroComponent);
    return CadastroComponent;
}());
exports.CadastroComponent = CadastroComponent;
//Cadastro não possuirá um modulo próprio pois está atrelado ao AppModule, sendo usado apenas nessa aplicação 
//# sourceMappingURL=cadastro.component.js.map