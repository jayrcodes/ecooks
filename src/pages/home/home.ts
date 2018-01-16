import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RecipesProvider } from '../../providers/recipes/recipes'
import { RecipeInstructionsComponent } from '../../components/recipe-instructions/recipe-instructions'
import { SavedRecipesComponent } from '../../components/saved-recipes/saved-recipes'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  text: string;
  recipes: any;
  loader: any

  constructor(
    public navCtrl: NavController,
    private tts: TextToSpeech,
    private recipe: RecipesProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
   ) {
  }

  ngOnInit () {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.getRecipes()
  }

  getRecipes () {
    let errorAlert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Cannot retreive data. Please check your connection',
      buttons: ['OK']
    });

    this.loader.present()
    this.recipe.getRecipes().subscribe(
      res => {
        this.recipes = res
        this.loader.dismiss()
      },
      err => {
        this.loader.dismiss()
        errorAlert.present()
      }
    )
  }

  async sayText($event) : Promise<any> {
    try {
      let { value } = $event.target

      await this.tts.speak(value)

      console.log(value)

    } catch (error) {
      console.log(error)
    }
  }

  itemSelected (recipe) {
    this.navCtrl.push(RecipeInstructionsComponent, {
      id: recipe.id
    })
  }

  goToSavedRecipes () {
    this.navCtrl.push(SavedRecipesComponent)
  }

  doInfinite (infiniteScroll) {
    let errorAlert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Cannot retreive data. Please check your connection',
      buttons: ['OK']
    });

    this.recipe.getRecipes().subscribe(
      (newRecipes: Array<any>) => {
        newRecipes.forEach(recipe => {
          this.recipes.push(recipe)
        })
        infiniteScroll.complete()
      },
      err => {
        errorAlert.present()
        infiniteScroll.complete()
      }
    )
  }
}
