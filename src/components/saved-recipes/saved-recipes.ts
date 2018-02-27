import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe'
import { RecipeInstructionsComponent } from '../../components/recipe-instructions/recipe-instructions'

@Component({
  selector: 'saved-recipes',
  templateUrl: 'saved-recipes.html'
})
export class SavedRecipesComponent {
  savedRecipes = []

  constructor (
      public navCtrl: NavController,
      private recipe: RecipeProvider,
    ) {
  }

  ngOnInit () {
    setInterval(() => {
      this.getSavedRecipes()
    }, 1000)
  }

  async getSavedRecipes () {
    let savedRecipes = await this.recipe.getSavedRecipes()

    if (savedRecipes) {
      this.savedRecipes = JSON.parse(savedRecipes)
    }
  }

  savedRecipeSelected (recipe) {
    this.navCtrl.push(RecipeInstructionsComponent, {
      isLocal: true,
      recipeDetails: recipe
    })
  }

}
