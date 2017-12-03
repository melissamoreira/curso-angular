import 'rxjs/add/operator/map'; 
//Importando a extensão map do rxjs

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FotoModule } from './foto/foto.module';
import { HttpModule } from '@angular/http';
// HttpModule é um módulo que já possui um provider do http configurado, pronto para ser injetado

import { PainelModule } from './painel/painel.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';

//Import do arquivo de rotas da aplicação
import { routing } from './app.routes';

//Um módulo anotado com NgModule pode importar outros módulos anotados com o NgModule
@NgModule ({
    imports: [ 
        BrowserModule, 
        FotoModule, 
        HttpModule, 
        PainelModule, 
        routing ], //Imports da aplicação
    declarations: [ 
        AppComponent, 
        CadastroComponent, 
        ListagemComponent ], // O que a aplicação contém, todos os componentes que fizerem parte do módulo
    bootstrap: [ AppComponent ] // O primeiro componente a ser carregado no módulo
})

export class AppModule { }