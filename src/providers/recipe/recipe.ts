import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../../constants/baseUrl'
import { SAVED_RECIPES } from '../../constants/savedRecipes'
import { Storage } from '@ionic/storage';
import _ from 'lodash'

import 'rxjs/add/operator/map';

@Injectable()
export class RecipeProvider {

  constructor (
      public http: HttpClient,
      private storage: Storage,
    ) {
  }

  getRecipe (id) {
    return this.http.get(`${baseUrl}/recipes/${id}`)
  }

  searchRecipe (keyword) {
    return this.http.get(`${baseUrl}/recipes?keyword=${keyword}`)
  }

  getSavedRecipes () {
    return this.storage.get(SAVED_RECIPES)
  }

  async saveRecipe (recipeDetails) {
    let savedRecipes = await this.storage.get(SAVED_RECIPES)

    if (savedRecipes) {
      savedRecipes = JSON.parse(savedRecipes)
    } else {
      savedRecipes = []
    }

    savedRecipes.push(recipeDetails)

    savedRecipes = JSON.stringify(savedRecipes)

    this.storage.set(SAVED_RECIPES, savedRecipes)
  }

  async removeRecipe (recipeDetails) {
    let savedRecipes = await this.storage.get(SAVED_RECIPES)

    if (savedRecipes) {
      savedRecipes = JSON.parse(savedRecipes)
    } else {
      savedRecipes = []
    }

    _.remove(savedRecipes, (recipe) => {
      return recipe.recipe_id === recipeDetails.recipe_id.toString()
    })

    savedRecipes = JSON.stringify(savedRecipes)

    this.storage.set(SAVED_RECIPES, savedRecipes)
  }

}
