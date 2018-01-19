import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../../constants/baseUrl'

import 'rxjs/add/operator/map';

@Injectable()
export class RecipeProvider {

  constructor(public http: HttpClient) {
  }

  getRecipe (id) {
    return this.http.get(`${baseUrl}/recipes/${id}`)
  }

  searchRecipe (keyword) {
    return this.http.get(`${baseUrl}/recipes?keyword=${keyword}`)
  }

}
