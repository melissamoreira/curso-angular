# Escondendo a complexidade do nosso código em serviços
Lidamos mais uma vez com o serviço *Http* quando implementamos a inclusão de fotos em nosso cadastro. Contudo, para utilizarmos o método *http.post* foi necessário converter o objeto JavaScript que representa nossa foto em *JSON*, inclusive fomos nós os responsáveis em configurar o header da requisição indicando para o servidor que estamos enviando um conteúdo do tipo *application/json*.

Além dessa burocracia, nada impede de uma hora para outra que o endereço da API acessada do servidor mude de endereço. Se isso acontecer, teremos que mudar o endereço em *ListagemComponent* e também em *CadastroComponent*, isto é, precisaremos alterar em todos os componentes que acessam aquela **API**.

No entanto, podemos nos blindar de todos esses problemas isolando nosso código em uma classe especializada em acessar nosso servidor, ou seja, sua API. Quem precisar consumir alguma API do servidor fará por intermédia de uma instância dessa classe. Queremos um **serviço** que possa ser reutilizado em vários locais da nossa aplicação.

Vejamos o exemplo do seguinte serviço:

    import { Http, Headers, Response } from '@angular/http';
    import { FotoComponent } from './foto.component';
    import {Observable} from 'rxjs'; 
    
    export class FotoService {
        http: Http;
        headers: Headers;
        url: string = 'v1/fotos';
    
        constructor(http: Http) { 
    
            this.http = http;
            this.headers = new Headers();
            this.headers.append('Content-Type', 'application/json');
        }
    
        lista(): Observable<FotoComponent[]> {
    
            return this.http.get(this.url)
                .map(res => res.json());
        }
    
        cadastra(foto: FotoComponent): Observable<Response> {
    
            return this.http.post(this.url, JSON.stringify(foto), 
                    { headers: this.headers }); 
        }
    }

Ele nada mais é do que uma classe sem qualquer decorator.

**Questão**

Para que seja possível injetar FotoService em outros componentes é necessário (assuma a existência de FotoModule):


> Anotar FotoService com @Injectable, caso contrário Angular não entenderá que deve procurar as dependências do próprio serviço quando for injetá-lo. Além disso, o móduloFotoModule precisa adicionar FotoService em sua lista de providers.


Precisamos anotar FotoService com @Injectable, caso contrário Angular não entenderá que deve procurar as dependências do próprio serviço quando for injetá-lo. Além disso, a própria classe precisa ser adicionada como provider no módulo FotoModule para que a injeção funcione.

---

# Observable
No video criamos uma primeira versão do nosso FotoService devolvendo um simples Observable:

    export class FotoService {

    http: Http;
    headers: Headers; 
    url: string = 'v1/fotos';   

    constructor(http: Http) { 

        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    lista(): Observable {

        return this.http.get(this.url)
            .map(res => res.json());

    }

    cadastra(foto): Observable {

        return this.http.post(this.url, JSON.stringify(foto), 
                { headers: this.headers }); 
    }
}

No entanto o compilador acusou um erro:

    Generic type 'Observable<T>' requires 1 type argument(s).
    import Observable


**Como podemos arrumar o nosso código para satisfazer o compilador?**


Devemos parametrizar o retorno usando Generics. No curso vimos duas formas de definir um Type Parameter:

`Observable<Array<FotoComponent>>`

Ou a forma mais enxuta:

`Observable<FotoComponent[]>`

Bem vindo ao mundo de tipagem estática!


---
# Um novo serviço

Qual é a vantagem de criar um FotoService no contexto da nossa aplicação ?

> Conforme a aplicação vai crescendo, vão surgindo cada vez mais componentes que consomem dados sobre as fotos do servidor, espalhando o código para consultar estes dados por diversas partes da aplicação. Criando um FotoService centralizamos este código em uma única parte da aplicação, que caso sofra alguma alteração, só ela precisa ser modificada.


Criamos o *FotoService* pois nos componentes *ListagemComponent* e *CadastroComponent* usamos o serviço *Http* para consumir dados do nosso servidor e em ambos os declaramos o endereço */v1/fotos*. Ao crescer da nossa aplicação, pode ser que em mais locais este acesso ao servidor seja necessário, espalhando este código por diversas partes. Em caso da mudança deste endereço, realizar a alteração em todos os locais que esta lógica foi escrita pode ser algo bastante trabalhoso e contra-produtivo.

Com o *FotoService* conseguimos centralizar esta lógica em uma única parte da aplicação, melhorando a manutenibilidade do código.

---  

# Injeção correta

Dado a classe FotoService:

    @Injectable()
    export class FotoService {
        //implementação omitida
    }

Qual das opções abaixo representa um construtor que recebe um objeto FotoService?

> constructor(@Inject(FotoService) service) { ... }

ou

> constructor(service: FotoService) { ... }  


Repare que é preciso definir o tipo de alguma forma, ou pelo decorator `@Inject(FotoService) service`, ou pela tipagem estática `service: FotoService`.


------------------

# Parte2 | Aula 03 - Removendo dados inconsistentes

------------------

# Change Detection

Angular só monitora a *REFERÊNCIA* de **this.fotos** do nosso componente, e não a lista em si. Se alguém incluir ou remover um novo item da lista ele não saberá.  
Para isso, precisamos criar uma nova lista e atribuir essa lista a this.fotos. 
        
Como estamos reatribuindo um valor para a variável o Angular desencadeará seu mecanismo de deteção de mudança *(Change Detection)* e renderizará a view.


------------------

# Parte2 | Aula 04 - Onde está nossa alteração?

------------------


## [routerLink] com parâmetros

Para utilizar parâmetros na diretiva [routerLink], no template, é preciso passar o **array** com a url na pimeira posição, e o parâmetro na segunda posição, como feito abaixo:

    [routerLink]="['/cadastro', foto._id]"

## Alteração de fotos

Muitas vezes, queremos criar rotas parametrizadas. Por exemplo, hoje temos a rota **localhost:3000/cadastro**, mas podemos querer usar a mesma rota passando o ID da foto que desejamos alterar como **localhost:3000/cadastro/12**. Veja que o código da foto é variável, não sabemos de antemão qual é, mas sabemos que ela virá logo após /cadastro.

Podemos parametrizar rotas em Angular, inclusive podemos até obter o parâmetro passado para rota em nossos componentes.

Qual das opções abaixo parametriza a rota /cadastro para que aceite receber um parâmetro que indique o ID da foto? *(OBS: não entramos ainda no mérito de como o ID passado como parâmetro será acessado.)*


A resposta é:

    { path: 'cadastro/:id', component: CadastroComponent }

A presença do dois pontos antes do parâmetro é fundamental.


## Obtendo parâmetros de rotas

Quando acessamos rotas parametrizadas como */cadastro/:id* podemos ter acesso ao valor do curinga **:id** através do serviço **ActivatedRoute**

> Não confunda o serviço **ActivatedRoute** com **Router**. O primeiro sabe apenas dos parâmetros da rota, o segundo nos permite realizarmos navegações programaticamente. 


## Navegação via componente

Para realizar a navegação via componente (e não pelo template), como um redirect, utilizamos o **Router**, import de *'@angular/router'*, por meio do método **navigate()**:

        route: Router; //route é um Router
        this.route.navigate(['/']);

Onde o array passado por parâmetro representa a rota, nesse caso, a página inicial.


------------------

# Parte2 | Aula 05 - Modificadores de acesso e Encapsulamento

------------------

Em TypeScript podemos usar o tipo **any** para indicar que o tipo retornado é qualquer tipo. Na verdade ele foi adicionados aos tipos deste superset do ES6 para possibilitar sua introdução em sistema legados, quando não há uma maneira clara de especificar o tipo. 

    // código anterior omitido 

    cadastra(foto: FotoComponent): Observable<any> {

       // código omitido  
    }


# Modificadores de acesso

No TypeScript é possível declarar atributos e métodos **private**.
É uma convenção iniciar o nome de atributos privados com underline, como em **_mensagem**.

------------------

# Parte2 | Aula 06 - Mais componentes / Output / EventEmitter

------------------

## Recapitulando


O **Output** é um decorator que permite criarmos eventos customizado, isto é, eventos que não existem na especificação JavaScript. Contudo, precisamos associar o decorator a uma instância de **EventEmitter** do pacte *@angular/core*. 


O **selector** de um componente nada mais é do que o nome que utilizaremos para utilizarmos o componente no template de outros componentes. O nome da 'tag' utilizada.


O nome de um evento customizado é o nome do atributo decorado com **Output** e que guarda uma instância de **EventEmitter**.


O **Input** é um decorator para definir uma *inbound property* de um componente. Em outras palavras, ela permite passarmos valores o selector do componente.

---

## Disparando (Emitindo) um evento!

Temos a seguinte definição do componente abaixo:

    import { Component, Output, EventEmitter } from '@angular/core';

    @Component({
    selector: 'meuComponente',
    templateUrl: './meu-component.html'
    })
    class MeuComponent { 

    @Output meuEvento = new EventEmitter();

    executaAcao() {
        // como dispara o evento aqui?
    }
    }

No método *executaAcao*, como disparamos o evento *meuEvento*? Ele não receberá nenhum parâmetro. 

    this.meuEvento.emit();

Disparamos um evento que não envia dado algum. É possível passar **null** se assim desejarmos.

Quando um evento é disparado, podemos transferir com o evento um dado. Que tal vermos esse processo para sabermos ainda mais sobre eventos customizado?

Primeiro, vamos definir o tipo do nosso *EventEmitter*. Ele será do tipo *number*. É o tipo que definimos no generic do *EventEmitter* que define o tipo aceito pelo seu método *emit*:

    import { Component, Output, EventEmitter } from '@angular/core';

    @Component({
    selector: 'meuComponente',
    templateUrl: './meu-component.html'
    })
    class MeuComponent { 

        @Output meuEvento = new EventEmitter<number>(); // tipando o EventEmitter

        executaAcao() {
            this.meuEvento.emit(10); // como nosso EventEmitter é do tipo number, podemos passar um número. Qualquer outra coisa geraria um erro de compilação.
        }
    }

O template do nosso componente.


    <button (click)="executaAcao()">Meu botão</button>

Dentro do template de outro componente qualquer, usamos nosso componente através do seu selector:

    <meuComponent (meuEvento)="metodoQualquerdoComponent($event)"></meuComponent>

Veja que o método recebe **$event**. Sendo assim, no método do componente se fizermos:

    metodoQualquerDoComponent(event) {

        alert(event); // exibe 10!
    }

---

## Para saber mais: enviando dados com o evento

Quando um evento é disparado, podemos transferir com o evento um dado. Quem responder ao evento, terá acesso ao dado. Que tal vermos esse processo para sabermos ainda mais sobre eventos customizados?

Quando disponibilizamos um dado com um evento customizado, é uma boa prática definirmos o tipo da instância de *EventEmitter*. A vantagem disso é que o tipo passado para a generic de *EventEmitter* faz com que o método *emit* aceite apenas dados desse tipo:

    import { Component, Output, EventEmitter } from '@angular/core';

    @Component({
    selector: 'meuComponente',
    templateUrl: './meu-component.html'
    })
    class MeuComponent { 

        @Output meuEvento = new EventEmitter<number>(); // tipando o EventEmitter

        executaAcao() {
            this.meuEvento.emit(10); // como nosso EventEmitter é do tipo number, podemos passar um número. Qualquer outra coisa geraria um erro de compilação.
        }
    }

O template do nosso componente.

    <!-- meu-component.html -->
    <button (click)="executaAcao()">Meu botão</button>

Dentro do template de outro componente qualquer, usamos nosso componente através do seu *selector*:

    <meuComponent (meuEvento)="metodoQualquerdoComponent($event)"></meuComponent>

Veja que associamos ao **meuEvento** um método de um componente, no caso aquele cujo template utilizou *meuComponent*. Como meuComponet em sua definição dispara um evento *click* que por debaixo dos panos chama **this.meuEvento.emit(10)**, assim que for disparado, chamará o método definido em meuEvento do nosso componente. Este método tem acesso a *$event*. Sendo assim, no método, *$event* passa a ser o dado que disponibilizamos.

    metodoQualquerDoComponent(event) {

        alert(event); // exibe 10!
    }


------------------

# Parte2 | Aula 07 - Aproveitando seu conhecimento de jQuery 

------------------

# jQuery com 

Nossa aplicação está cada vez melhor, contudo a remoção de fotos ocorre de maneira abrupta após confirmada. Para deixarmos nossos usuários ainda mais confortáveis com nossa aplicação podemos realizarmos um efeito de *fade out*, aquele no qual a imagem vai se tornando transparente até desaparecer. Podemos até pensar em uma solução 100% Angular combinando CSS dinamicamente, contudo adotaremos uma abordagem diferente.

Não é raro o desenvolvedor front-end que passa a utilizar o framework da Google ter alguma noção de **jQuery**, a biblioteca de manipulação de DOM mais famosa do mercado. Realizar um *fade* não é complicado com jQuery, basta selecionarmos o elemento do DOM que desejamos aplicar o efeito para em seguida chamarmos a função **fadeOut** como no exemplo hipotético abaixo:

    // exemplo hipotético, não entra em nenhum lugar da nossa aplicação.
    $('div').fadeOut(function() {
        console.log('Realizou o fade out');
    });

Apesar da equipe do Angular desencorajar a manipulação direta do DOM em nossa aplicação Angular, pode ser que em determinadas situações ela seja a melhor opção, mesmo que em casos raros. Saber acessar elementos do DOM e integrar nosso código do Angular com jQuery é algo que precisamos ter na manga para qualquer eventualidade, principalmente em sistemas nos quais boa parte das funcionalidades fazem uso do jQuery.

## Baixando o jQuery pelo npm

Primeiro, precisamos baixar a biblioteca do jQuery e podemos fazer isso como npm, assim como fizemos com o Bootstrap. No terminal, e dentro da pasta **/client** vamos executar o comando

    npm install jquery@3.1.1 --save

Como qualquer dependência baixada pelo npm, o jQuery ficará dentro da pasta alurapic/client/node_modules. Vamos importá-lo em /client/index.html:    

    <!doctype html>
    <html>
        <head>
            <base href="/">
            <title>Alurapic</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width">

            <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
            <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css">

        <!-- importando o jQuery -->

        <script src="node_modules/jquery/dist/jquery.js"></script>

        <!-- outros scripts omitidos -->


Como utilizaremos o jQuery? Como nossa foto é exibida dentro *PainelComponent*, que tal adicionarmos um método em sua classe que realiza o *fade out* para nós? Com isso, basta termos uma referência do painel em nosso código para em seguida chamarmos a nossa função. Porém, para que isso seja possível, precisamos ter uma referência do DOM do componente para que possamos manipulá-lo com jQuery.

Podemos solicitar ao sistema de injeção de dependências do Angular o elemento do DOM do nosso componente adicionando no construtor de PainelComponent um elemento do tipo **ElementRef**, só não podemos esquecer de importá-lo do módulo *@angular/core*, caso contrário nosso código não compilará.

## Referência de elemento através de injeção

    import { Component, Input, OnInit, ElementRef } from '@angular/core';

    @Component({
        moduleId: module.id,
        selector: 'painel',
        templateUrl: './painel.component.html',
        styleUrls: ['./painel.component.css'],
    })
    export class PainelComponent implements OnInit {

        @Input() titulo: string;
        private elemento: ElementRef;

        constructor(elemento: ElementRef) {
            this.elemento = elemento; 
        }   

        ngOnInit() {
            this.titulo = this.titulo.length > 7 ?
                this.titulo.substr(0, 7) + '...' : 
                this.titulo;
        }
    }

Um elemento do tipo *ElementRef* encapsula o elemento do DOM do nosso componente na propriedade **nativeElement**. Agora, podemos implementar nosso método fadeOut:



    import { Component, Input, OnInit, ElementRef } from '@angular/core';

    @Component({
        moduleId: module.id,
        selector: 'painel',
        templateUrl: './painel.component.html',
        styleUrls: ['./painel.component.css'],
    })
    export class PainelComponent implements OnInit {

        @Input() titulo: string;
        private elemento: ElementRef;

        constructor(elemento: ElementRef) {
            this.elemento = elemento; 
        }   

        ngOnInit() {
            this.titulo = this.titulo.length > 7 ?
                this.titulo.substr(0, 7) + '...' : 
                this.titulo;
        }

        fadeOut(cb) {   
        // erro de compilação! Não entra o $!
            $(this.elemento.nativeElement).fadeOut(cb);
        }
    }

---

## Erro de compilação



Temos um problema, o compilador TypeScript não consegue encontrar a declaração da variável **$**. Por padrão, o script que carrega o jQuery disponibiliza globalmente a variável $ para que possamos utilizá-lo, contudo o TypeScript considera a variável como não declarada e se recusará em compilar nosso código. Além disso, se escrevermos $ e o operador . o Visual Studio Code (ou seu editor favorito com suporte ao TypeScript) não reconhece nenhuma de suas funções e nem poderia, já que o jQuery foi criado sem TypeScript e não usa qualquer tipagem.

Para podemos trabalhar com bibliotecas que não foram escritas em TypeScript precisamos declarar a API que a biblioteca expõe em TypeScript. É apenas uma declaração sem qualquer implementação, até porque a implementação já existe na biblioteca. O TypeScript chama de "ambient" toda declaração sem implementação, inclusive essas declarações costumam ser definidas em arquivo .d.ts.

A boa notícia é que não precisamos nos preocupar coma declaração de arquivos "ambient". Podemos baixar de um repositórios na Web arquivos .d.ts do jQuery e de outras bibliotecas usadas pela comunidade, tudo através da ferramenta **Typings**. Ela já consta em /client/package.json e por isso já foi baixada para nós.

---

## Definições do jQuery para o TypeScript

Agora, vamos verificar se existe algum arquivo d.ts para o jQuery:

    npm run typings search jquery

Várias outras bibliotecas são listadas e a boa notícia é que realmente existe um arquivo para o jQuery. Agora, vamos baixá-lo, mas usando a seguinte sintaxe:

    node ./node_modules/typings/dist/bin install dt~jquery --global --save

Além do nosso arquivo */client/typings.json* agora conter a definição que baixamos, a pasta */typings* foi criada e dentro dela temos a definição.

É uma boa prática baixar todos as definições de tipos listadas em nosso projeto quando baixamos suas dependências. Para evitarmos esquecer esse passo, podemos executar o comando typing install que baixará todas as definições listadas em typings.json ao término do comando npm installl. É por isso que adicionaremos em alurapic/client/package.json um script de **postinstall**:

    // /client/package.json
    // código anterior omitido
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "tsc:w": "tsc -w",
        "start": "npm run tsc:w",
        "typings": "typings",
        "postinstall": "typings install" 
      },
    // código posterior omitido
 
Excelente! Agora precisamos alterar o método remove do componente *ListagemComponent*. Ele agora deve receber também como parâmetro um PainelComponent contendo o *PainelComponent* da foto que estamos removendo em mãos, podemos chamar seu método fadeOut e assim que o efeito terminar, removemos a foto da lista com a posição que recebemos.

---


## Mais template
    
    // /client/app/listagem/listagem.component.ts
    
    import { Component } from '@angular/core';
    import { Http } from '@angular/http';
    import { FotoComponent } from '../foto/foto.component';
    import { FotoService } from '../foto/foto.service';
    import { PainelComponent } from '../painel/painel.component';
    
    @Component({
        moduleId: module.id,
        selector: 'listagem',
        templateUrl: './listagem.component.html' 
    })
    export class ListagemComponent { 
    
        fotos: FotoComponent[] = [];
        service: FotoService;
        mensagem: string = '';
    
        constructor(service: FotoService) {
            this.service = service;
    
            this.service.lista()
                .subscribe(
                    fotos => this.fotos = fotos,
                    erro => console.log(erro)
                );
        }
    
        remove(foto: FotoComponent, painel: PainelComponent) {
    
            this.service
                .remove(foto)
                .subscribe(
                    () => {
    
                        painel.fadeOut(() => {
    
                            let novasFotos = this.fotos.slice(0);
                            let indice = novasFotos.indexOf(foto);
                            novasFotos.splice(indice, 1);
                            this.fotos = novasFotos;
                            this.mensagem = 'Foto removida com sucesso';
                        }); 
                    }, 
                    erro => {
                        console.log(erro);
                        this.mensagem = 'Não foi possível remover a foto';
                    }
                );
    
        }
    }
    
## Declarando mais uma vez variáveis no template

Por fim, só precisamos alterar o template de *ListagemComponent* para que passe, além da foto, o painel. Vamos lançar mão mais uma vez da variável local de template. Criaremos uma para termos uma referência para o painel:
    
    <!-- /client/app/listagem/listagem.component.html -->
    
    <!-- código anterior omitido -->
    
    <div class="row">
        <painel #painel *ngFor="let foto of fotos | filtroPorTitulo: textoProcurado.value" titulo="{{foto.titulo | uppercase}}"  class="col-md-2">
            <a [routerLink]="['/cadastro', foto._id]">
                <foto titulo="{{foto.titulo}}" url="{{foto.url}}"></foto>
            </a>
            <br>
            <botao confirmacao="true" nome="Remover" estilo="btn-danger btn-block" (acao)="remove(foto, painel)"></botao>
        </painel>
    </div><!-- fim row -->
    
---
    
# jQuery e outras bibliotecas

Quando usamos uma biblioteca que não foi criada em TypeScript não podemos usar o poder do seu intellisense, inclusive nosso código não compilará pois o TypeScript pode entender que determinada não foi declarada antes. Isso acontece no caso do jQuery, por exemplo, que vive no escopo Global.

Contudo, podemos não só resolver problemas de compilação em nosso sistema com TypeScript, mas ainda lançar mão do intellisense para bibliotecas que não foram criados com TypeScript, tudo através de um:

> arquivo d.ts (Type Definition File)

Nada impede que criadores de bibliotecas do mercado criem seu arquivo **t.ds**, o famoso **Type Definition File**. Este arquivo é completamente isolado do servidor e mapeia para cada função, parâmetros e variáveis tipos em TypeScript. É por isso que podemos usar todo poder do TypeScript com jQuery, contanto que o criado do framework ou terceiros tenham criado o arquivo t.ds.

Aliás, através do utilitário typings baixado através do npm podemos buscar na web os arquivos d.ts de diversas bibliotecas famosas do mercado.

---

# Typings

Temos algumas afirmações sobre os Type Definitions Files.

> a) Podem ser baixados através da ferramenta de typings ou diretamente pela internet.

> b) Pode existir mais de um d.ts para uma mesma biblioteca. O ideal é buscar o mais atualizado para a versão da biblioteca que usamos.

> c) Ajuda a resolver erros de compilação, principalmente quando usamos um artefato no escopo global.