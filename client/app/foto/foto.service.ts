import { Http, Headers, Response } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
        
@Injectable ()
export class FotoService {

    http: Http;
    headers: Headers;
    url: string = 'v1/fotos';

    constructor (http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type','application/json');
    }

    lista (): Observable <FotoComponent[]> {

        return this.http.get(this.url)
                        .map( res => res.json());
    }

    cadastra(foto:FotoComponent): Observable<MensagemCadastro> {

        /*
            A função retorna um observable do tipo MensagemCadastro, que indica se foi realizada uma alteração ou nova inserção.

            Abaixo, verificamos se a foto já possui id.
            Se possuir, realizamos o put, senão, realizamos o post.
        */

        if (foto._id) {

            return this.http.put(
                this.url + '/' + foto._id, JSON.stringify(foto),
                { headers: this.headers })
                .map(() => new MensagemCadastro('Foto alterada com sucesso!', false));

        } else  {
            return this.http.post(
                this.url, JSON.stringify(foto), { headers: this.headers })
                .map(() => new MensagemCadastro('Foto inserida com sucesso!', true));    

        }   

    }

    remove(foto:FotoComponent): Observable<Response> {
        
        return this.http.delete( this.url +  "/" + foto._id );
    }

    buscar(id: string): Observable<FotoComponent> {
        
        return this.http.get( this.url + "/" + id)
                        .map( res => res.json());
    }

}

/*
    Foi criada mais uma classe, ou seja, um novo tipo: MensagemCadastro.
    Assim, a cada inserção ou atualização de registro, o método cadastra() retornará uma mensagem adequada e um booleano indicando se é um alteração ou novo registro.
    Graças ao TypeScript, pudemos declarar os atributos _mensagem e _inclusao como privados, dessa forma, esses dados não poderão ser modificados depois de criados.
*/

export class MensagemCadastro {

    /*
        A declaração dos atributos private pode ocorrer diretamente via parâmetro do constructor, apenas como uma forma de manter o código enxuto.
    */
    constructor (private _mensagem: string, private _inclusao: boolean) {
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    /*
        Os métodos get abaixo são public, entretanto, esse é o valor padrão para os atributos e métodos no TS. Não é necessário especificá-lo.
    */

    public get mensagem (): string {
        return this._mensagem;
    }

    public get inclusao (): boolean {
        return this._inclusao;
    }
}