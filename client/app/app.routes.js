"use strict";
var router_1 = require("@angular/router");
var listagem_component_1 = require("./listagem/listagem.component");
var cadastro_component_1 = require("./cadastro/cadastro.component");
//A constante appRoutes é um array do tipo Routes
var appRoutes = [
    //Os objetos com os atributos path e component determinam as rotas
    { path: '', component: listagem_component_1.ListagemComponent },
    { path: 'cadastro', component: cadastro_component_1.CadastroComponent },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
/*

O módulo RouterModule constrói as rotas com base na configuração definida em 'appRoutes'. Agora basta importar a const 'routing' nos imports do módulo principal da aplicação.

 */ 
//# sourceMappingURL=app.routes.js.map