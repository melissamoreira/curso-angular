import { Component, ElementRef, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "modal",
    templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit{

    @Input()  private titulo: string = 'Atenção';
    @Input()  private frase: string = '';
    @Output() confirma = new EventEmitter(); //Evento disparado com o "OK"

    constructor(private _element: ElementRef){
        
        this._element = _element;        
    }

    //ngAfterViewInit = "Lifecycle hook that is called after a component's view has been fully initialized." É chamado depois que a view do componente foi completamente inicializada.

    ngAfterViewInit() {

        //Configurando o modal
        $(this._element.nativeElement).dialog({
            
            title: this.titulo,
            autoOpen: false,
            resizable: false,
            modal: true,
            buttons:  {
                
                Cancelar: ()=> {
                    $(this._element.nativeElement).dialog("close");
                        //Fecha o modal, SEM confirmação                        
                },
                Confirmar: ()=> {
                    $(this._element.nativeElement).dialog("close");
                    this.confirma.emit();
                        //Fecha o modal, COM confirmação
                }
            }
        });
    }
 
    //Abre o modal
    show() {

        $(this._element.nativeElement).dialog("open");
    }
}

