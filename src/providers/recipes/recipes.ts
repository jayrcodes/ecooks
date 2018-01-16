import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RecipesProvider Provider');
  }

  getRecipes () {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

}
