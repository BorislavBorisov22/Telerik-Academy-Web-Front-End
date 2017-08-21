import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

const googleKey = '';

@Injectable()
export class DataService {

  constructor(public http: Http) {
    console.log('data service connected');
  }

  getPosts() {
    return this.http.get('http://jsonplaceholder.typicode.com/posts')
      .map(res => res.json());
  }
}
