import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe'
import { LoadingController } from 'ionic-angular';
import baseUrl from '../../constants/baseUrl'

@Component({
  selector: 'recipe-instructions',
  templateUrl: 'recipe-instructions.html',
  providers: [
    RecipeProvider
  ]
})
export class RecipeInstructionsComponent {
  baseUrl = baseUrl
  id = String
  loader: any
  recipeDetails = {
    name: 'test',
    recipe_id: 0,
    body: 'test body'
  }

  constructor (
      private navParams: NavParams,
      private recipe: RecipeProvider,
      public loadingCtrl: LoadingController
    ) {
  }

  ngOnInit () {
    this.recipeDetails.recipe_id = this.navParams.get('recipeId')
    this.getRecipe(this.recipeDetails.recipe_id)
  }

  getRecipe (recipeId) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present()
    this.recipe.getRecipe(recipeId).subscribe((res: any) => {
      this.recipeDetails = res.data
      loader.dismiss()
    })
  }

}
