import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../../constants/baseUrl'

import 'rxjs/add/operator/map';

@Injectable()
export class CategoryProvider {

  constructor(public http: HttpClient) {
  }

  getCategories () {
    return this.http.get(`${baseUrl}/Categories/get_categories`)
  }

  getRecipes (id) {
    return this.http.get(`${baseUrl}/categories/${id}/recipes`)
  }

}
