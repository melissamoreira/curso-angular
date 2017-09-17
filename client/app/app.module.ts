import 'rxjs/add/operator/map'; 
//Importando a extensão map do rxjs

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FotoModule } from './foto/foto.module';
import { HttpModule } from '@angular/http';
// HttpModule é um módulo que já possui um provider do http configurado, pronto para ser injetado


//Um módulo anotado com NgModule pode importar outros módulos anotados com o NgModule
@NgModule ({
    imports:      [ BrowserModule, FotoModule, HttpModule ], //Imports da aplicação
    declarations: [ AppComponent ], // O que a aplicação contém, todos os componentes que fizerem parte do módulo
    bootstrap :   [ AppComponent ] // O primeiro componente a ser carregado no módulo
})

//Módulo principal da aplicação, é o primeiro a ser carregado
export class AppModule { }