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
  recipes: any
  loader: any

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
    this.getRecipes()
  }

  getRecipes () {
    this.loader.present()
    this.recipe.getRecipes().subscribe(res => {
      this.recipes = res
      this.loader.dismiss()
    })
  }

}
