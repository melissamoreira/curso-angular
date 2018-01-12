import { RouterModule, Routes } from "@angular/router";
import { ListagemComponent } from "./listagem/listagem.component";
import { CadastroComponent } from "./cadastro/cadastro.component";

const appRoutes: Routes = [

    //Os objetos com os atributos path e component determinam as rotas
    { path: '', component: ListagemComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'cadastro/:id', component: CadastroComponent },//Rota com parâmetro id
    { path: '**',  redirectTo: '' }

]

export const routing = RouterModule.forRoot(appRoutes);
/* 

O módulo RouterModule constrói as rotas com base na configuração definida em 'appRoutes'. Agora basta importar a const 'routing' nos imports do módulo principal da aplicação.

 */