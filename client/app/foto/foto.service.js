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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var FotoService = (function () {
    function FotoService(http) {
        this.url = 'v1/fotos';
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    FotoService.prototype.lista = function () {
        return this.http.get(this.url)
            .map(function (res) { return res.json(); });
    };
    FotoService.prototype.cadastra = function (foto) {
        /*
            A função retorna um observable do tipo MensagemCadastro, que indica se foi realizada uma alteração ou nova inserção.

            Abaixo, verificamos se a foto já possui id.
            Se possuir, realizamos o put, senão, realizamos o post.
        */
        if (foto._id) {
            return this.http.put(this.url + '/' + foto._id, JSON.stringify(foto), { headers: this.headers })
                .map(function () { return new MensagemCadastro('Foto alterada com sucesso!', false); });
        }
        else {
            return this.http.post(this.url, JSON.stringify(foto), { headers: this.headers })
                .map(function () { return new MensagemCadastro('Foto inserida com sucesso!', true); });
        }
    };
    FotoService.prototype.remove = function (foto) {
        return this.http.delete(this.url + "/" + foto._id);
    };
    FotoService.prototype.buscar = function (id) {
        return this.http.get(this.url + "/" + id)
            .map(function (res) { return res.json(); });
    };
    FotoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FotoService);
    return FotoService;
}());
exports.FotoService = FotoService;
/*
    Foi criada mais uma classe, ou seja, um novo tipo: MensagemCadastro.
    Assim, a cada inserção ou atualização de registro, o método cadastra() retornará uma mensagem adequada e um booleano indicando se é um alteração ou novo registro.
    Graças ao TypeScript, pudemos declarar os atributos _mensagem e _inclusao como privados, dessa forma, esses dados não poderão ser modificados depois de criados.
*/
var MensagemCadastro = (function () {
    /*
        A declaração dos atributos private pode ocorrer diretamente via parâmetro do constructor, apenas como uma forma de manter o código enxuto.
    */
    function MensagemCadastro(_mensagem, _inclusao) {
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }
    Object.defineProperty(MensagemCadastro.prototype, "mensagem", {
        /*
            Os métodos get abaixo são public, entretanto, esse é o valor padrão para os atributos e métodos no TS. Não é necessário especificá-lo.
        */
        get: function () {
            return this._mensagem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MensagemCadastro.prototype, "inclusao", {
        get: function () {
            return this._inclusao;
        },
        enumerable: true,
        configurable: true
    });
    return MensagemCadastro;
}());
exports.MensagemCadastro = MensagemCadastro;
//# sourceMappingURL=foto.service.js.map