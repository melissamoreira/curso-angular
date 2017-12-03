import { RouterModule, Routes } from "@angular/router";
import { ListagemComponent } from "./listagem/listagem.component";
import { CadastroComponent } from "./cadastro/cadastro.component";

//A constante appRoutes é um array do tipo Routes
const appRoutes: Routes = [

    //Os objetos com os atributos path e component determinam as rotas
    { path: '', component: ListagemComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: '**',  redirectTo: '' }
    
        //O path é o caminho, a URL digitada pelo usuário ou fruto de um link. O component indica qual componente deve ser carregado assim que a URL da rota for acessada.
]

export const routing = RouterModule.forRoot(appRoutes);
/* 

O módulo RouterModule constrói as rotas com base na configuração definida em 'appRoutes'. Agora basta importar a const 'routing' nos imports do módulo principal da aplicação.

 */