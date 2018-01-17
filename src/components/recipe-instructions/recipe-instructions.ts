import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { RecipeProvider } from '../../providers/recipe/recipe'
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'recipe-instructions',
  templateUrl: 'recipe-instructions.html',
  providers: [
    RecipeProvider
  ]
})
export class RecipeInstructionsComponent {
  id = String
  loader: any
  recipeDetails = {
    name: 'test',
    id: 0,
    body: 'test body'
  }

  constructor (
      private navParams: NavParams,
      private recipe: RecipeProvider,
      public loadingCtrl: LoadingController
    ) {
  }

  ngOnInit () {
    this.recipeDetails.id = this.navParams.get('id')

    // this.loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // this.getRecipe(this.id)
  }

  getRecipe (id) {
    this.loader.present()
    this.recipe.getRecipe(id).subscribe((res: any) => {
      this.recipeDetails = res
      this.loader.dismiss()
    })
  }

}
