import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class RecipeProvider {

  constructor(public http: HttpClient) {
  }

  getRecipe (id) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id)
  }

}
