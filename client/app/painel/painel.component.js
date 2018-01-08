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
var PainelComponent = (function () {
    function PainelComponent() {
    }
    //Recebe o título via input
    /*
        Se tentássemos realizar a operação abaixo dentro do construtor, ocorreria um erro.
        O problema é que toda property com o decorator Input só recebe os dados associados à propriedade depois da chamada do construtor. Sendo assim, quando tentássemos manipular o título ele ainda estaria undefined.

        A solução do problema mora no entendimento de que componentes em Angular2 possuem ciclos de vida, um deles é chamado de OnInit. Nele, o componente é iniciado, mas só depois das inbound properties terem sido atribuídas, como é o caso do título do nosso painel
    */
    PainelComponent.prototype.ngOnInit = function () {
        this.titulo = this.titulo.length > 7
            ? this.titulo.substr(0, 7) + '...'
            : this.titulo;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PainelComponent.prototype, "titulo", void 0);
    PainelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'painel',
            templateUrl: './painel.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], PainelComponent);
    return PainelComponent;
}());
exports.PainelComponent = PainelComponent;
//# sourceMappingURL=painel.component.js.map