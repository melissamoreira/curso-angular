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

    cadastra(foto:FotoComponent): Observable <Response> {

        /* 
            Abaixo, verificamos se a foto já possui id.
            Se possuir, realizamos o put, senão, realizamos o post.
        */
        return (foto._id)

            ? this.http.put(
                this.url + '/' + foto._id, JSON.stringify(foto),
                { headers: this.headers })

            : this.http.post(
                this.url, JSON.stringify(foto), { headers: this.headers });

    }

    remove(foto:FotoComponent): Observable<Response> {
        
        return this.http.delete( this.url +  "/" + foto._id );
    }

    buscar(id: string): Observable<FotoComponent> {

        //Buscando um registro específico por meio do id
        return this.http.get( this.url + "/" + id)
                        .map( res => res.json());
    }

}