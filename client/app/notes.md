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