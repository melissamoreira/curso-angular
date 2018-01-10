import { Http, Headers, Response } from '@angular/http';
import { FotoComponent } from './foto.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

/*
    Precisamos anotar FotoService com @Injectable, caso contrário Angular não entenderá que deve procurar as dependências do próprio serviço quando for injetá-lo. Além disso, a própria classe precisa ser adicionada como provider no módulo FotoModule para que a injeção funcione.
*/

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
        //Retorna um Observable (é possível fazer subscribe) do tipo array de FotoComponent

        return this.http.get(this.url)
                        .map( res => res.json());
    }

    cadastra(foto:FotoComponent): Observable <Response> {

        return this.http.post(
            this.url, JSON.stringify(foto), { headers: this.headers } 
        );

    }
}