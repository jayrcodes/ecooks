import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { RecipesProvider } from '../../providers/recipes/recipes'
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'recipe-instructions',
  templateUrl: 'recipe-instructions.html',
  providers: [
    RecipesProvider
  ]
})
export class RecipeInstructionsComponent {
  id = String
  loader: any
  recipeDetails = {
    title: '',
    id: 0,
    body: ''
  }

  constructor (
      private navParams: NavParams,
      private recipe: RecipesProvider,
      public loadingCtrl: LoadingController
    ) {
  }

  ngOnInit () {
    this.id = this.navParams.get('id')
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.getRecipe(this.id)
  }

  getRecipe (id) {
    this.loader.present()
    this.recipe.getRecipe(id).subscribe((res: any) => {
      this.recipeDetails = res
      this.loader.dismiss()
    })
  }

}
