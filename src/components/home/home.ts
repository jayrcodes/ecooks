import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RecipeProvider } from '../../providers/recipe/recipe'
import { CategoryProvider } from '../../providers/category/category'
import { RecipeInstructionsComponent } from '../../components/recipe-instructions/recipe-instructions'
import { SavedRecipesComponent } from '../../components/saved-recipes/saved-recipes'
import baseUrl from '../../constants/baseUrl'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  baseUrl = baseUrl
  categories: any;
  currentPage = 1
  currentCategory = null
  errorAlertObj = {
    title: 'Error',
    subTitle: 'Cannot retreive data. Please check your connection',
    buttons: ['OK']
  }
  isError = false;
  loader: any;
  mode = 'category' // category, recipe
  recipes: any;

  constructor(
    public navCtrl: NavController,
    private tts: TextToSpeech,
    private recipe: RecipeProvider,
    private category: CategoryProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
   ) {
  }

  ngOnInit () {
    this.getCategories()
  }

  categorySelected (category) {
    this.mode = 'recipe'
    this.currentCategory = category.name
    this.getRecipes(category.category_id)
  }

  getCategories () {
    let errorAlert = this.alertCtrl.create(this.errorAlertObj);
    let loader = this.loadingCtrl.create({ content: "Please wait..." })
    this.isError = false

    loader.present()
    this.category.getCategories().subscribe(
      (res: any) => {
        this.categories = res.data
        loader.dismiss()
      },
      err => {
        console.log(err)
        loader.dismiss()
        errorAlert.present()
        this.isError = true
      }
    )
  }

  getRecipes (id) {
    let errorAlert = this.alertCtrl.create(this.errorAlertObj);
    let loader = this.loadingCtrl.create({ content: "Please wait..." })
    this.isError = false

    loader.present()
    this.category.getRecipes(id).subscribe(
      (res: any) => {
        this.recipes = res.data
        loader.dismiss()
      },
      err => {
        loader.dismiss()
        errorAlert.present()
        this.isError = true
      }
    )
  }

  goToSavedRecipes () {
    this.navCtrl.push(SavedRecipesComponent)
  }

  goToCategories () {
    this.mode = 'category'
    this.getCategories()
  }

  doInfinite (infiniteScroll) {
    let errorAlert = this.alertCtrl.create(this.errorAlertObj);

    switch (this.mode) {
      case 'recipe':
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
        break;
    }
  }

  retry () {
    switch (this.mode) {
      case 'category':
        this.getCategories()
        break;
    }
  }  

  recipeSelected (recipe) {
    this.navCtrl.push(RecipeInstructionsComponent, {
      id: recipe.id
    })
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

}
