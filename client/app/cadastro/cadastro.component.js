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
var forms_1 = require('@angular/forms');
//Import das classes FormGroup, que representa um grupo de campos, FormBuilder, que permite criar instâncias de FormGroup e Validators que permite realizar as validações
var CadastroComponent = (function () {
    /*
        Angular nos permite agrupar vários campos (FormControl) dentro de um grupo (FormGroup). Essa maneira de agrupar controles é interessante, porque podemos perguntar ao grupo se ele esta válido (se todos os controles estão válidos) ou se é inválido (se um dos controles for inválido).
    */
    function CadastroComponent(http, fb) {
        //Injetando as classes Http e FormBuilder em instâncias
        this.foto = new foto_component_1.FotoComponent();
        this.http = http;
        //Utilizando o método group do FormBuilder fb é possível criar a validação para um ou mais campos
        this.meuForm = fb.group({
            titulo: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            url: ['', forms_1.Validators.required],
            descricao: ['']
        });
        /*
            Veja que o método group recebe um objeto JavaScript onde a chave é o identificador do campo e seu valor um array com configurações de validação. Usamos a chave titulo para indicar que estamos validando o campo título e assim por diante. O identificador do campo corresponde ao atributo 'formControlName' inserido diretamente no template.

            IMPORTANTE: Mesmo os campos que não possuirão validação devem constar no obj em group, e também devem possuir o atributo 'formControlName'!
         */
        /*
            Utilizando o método compose() de Validators, é possível definir mais de um validador para o campo. No caso de titulo, foi aplicado o required e um minLentgh de 4 caracteres. */
    }
    CadastroComponent.prototype.cadastrar = function (event) {
        var _this = this;
        event.preventDefault();
        console.log(this.foto);
        var headers = new http_1.Headers;
        headers.append('Content-type', 'application/json');
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
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], CadastroComponent);
    return CadastroComponent;
}());
exports.CadastroComponent = CadastroComponent;
//Cadastro não possuirá um modulo próprio pois está atrelado ao AppModule, sendo usado apenas nessa aplicação 
//# sourceMappingURL=cadastro.component.js.map