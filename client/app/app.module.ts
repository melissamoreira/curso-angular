import 'rxjs/add/operator/map'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FotoModule } from './foto/foto.module';
import { HttpModule } from '@angular/http';
import { PainelModule } from './painel/painel.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { routing } from './app.routes';

import { FormsModule } from '@angular/forms';

//Um módulo anotado com NgModule pode importar outros módulos anotados com o NgModule
@NgModule ({
    imports: [  
        BrowserModule, 
        FotoModule, 
        HttpModule, 
        PainelModule, 
        routing,
        FormsModule ], //Imports da aplicação
    declarations: [ 
        AppComponent, 
        CadastroComponent, 
        ListagemComponent ], // O que a aplicação contém, todos os componentes que fizerem parte do módulo
    bootstrap: [ AppComponent ] // O primeiro componente a ser carregado no módulo
})

export class AppModule { }