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
var ModalComponent = (function () {
    function ModalComponent(_element) {
        this._element = _element;
        this.titulo = 'Atenção';
        this.frase = '';
        this.confirma = new core_1.EventEmitter(); //Evento disparado com o "OK"
        this._element = _element;
    }
    //ngAfterViewInit = "Lifecycle hook that is called after a component's view has been fully initialized." É chamado depois que a view do componente foi completamente inicializada.
    ModalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Configurando o modal
        $(this._element.nativeElement).dialog({
            title: this.titulo,
            autoOpen: false,
            resizable: false,
            modal: true,
            buttons: {
                Cancelar: function () {
                    $(_this._element.nativeElement).dialog("close");
                    //Fecha o modal, SEM confirmação                        
                },
                Confirmar: function () {
                    $(_this._element.nativeElement).dialog("close");
                    _this.confirma.emit();
                    //Fecha o modal, COM confirmação
                }
            }
        });
    };
    //Abre o modal
    ModalComponent.prototype.show = function () {
        $(this._element.nativeElement).dialog("open");
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalComponent.prototype, "titulo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalComponent.prototype, "frase", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ModalComponent.prototype, "confirma", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "modal",
            templateUrl: './modal.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map