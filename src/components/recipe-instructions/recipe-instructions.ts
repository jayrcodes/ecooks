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
  isSaved = false
  isLocal = false
  loader: any
  recipeDetails = {
    name: 'test',
    recipe_id: 0,
    body: 'test body'
  }

  constructor (
      private navParams: NavParams,
      private recipe: RecipeProvider,
      public loadingCtrl: LoadingController,
    ) {
  }

  ngOnInit () {
    this.isLocal = this.navParams.get('isLocal')
    if (this.isLocal) {
      this.recipeDetails = this.navParams.get('recipeDetails')
    } else {
      this.recipeDetails.recipe_id = this.navParams.get('recipeId')
      this.getRecipe(this.recipeDetails.recipe_id)
    }
    this.checkRecipeIfSaved()
  }

  async checkRecipeIfSaved () {
    let savedRecipes = await this.recipe.getSavedRecipes()

    if (savedRecipes) {
      savedRecipes = JSON.parse(savedRecipes)

      savedRecipes.forEach(recipe => {
        if (recipe.recipe_id === this.recipeDetails.recipe_id.toString()) {
          this.isSaved = true
        }
      })
    }
  }

  getRecipe (recipeId) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present()
    this.recipe.getRecipe(recipeId).subscribe((res: any) => {
      this.recipeDetails = res.data
      this.checkRecipeIfSaved()
      loader.dismiss()
    })
  }

  saveRecipe () {
    this.recipe.saveRecipe(this.recipeDetails)
    this.isSaved = true
  }

  unsave () {
    this.recipe.removeRecipe(this.recipeDetails)
    this.isSaved = false
  }

}
