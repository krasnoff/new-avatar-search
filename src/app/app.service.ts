import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: Http) { }

  // here we activate the ajax request
  getMethod(url: string) {
    let headers = new Headers();
    
    return this._http.get(url, { headers: headers }).pipe(
        map(res => res.json()));
  }
}
