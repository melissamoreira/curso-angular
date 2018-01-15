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