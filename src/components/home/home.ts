import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
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
  currentTitle = null
  currentCategoryId = null
  errorAlertObj = {
    title: 'Error',
    subTitle: 'Cannot retreive data. Please check your connection',
    buttons: ['OK']
  }
  isError = false;
  loader: any;
  mode = 'category' // category, recipe
  recipes = [];

  constructor(
    public navCtrl: NavController,
    private tts: TextToSpeech,
    private recipe: RecipeProvider,
    private category: CategoryProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
   ) {
  }

  ngOnInit () {
    this.getCategories()
  }

  categorySelected (category) {
    this.mode = 'recipe'
    this.currentTitle = category.name
    this.currentCategoryId = category.category_id
    this.getRecipes(category.category_id)
  }

  doRefresh (refresher) {
    let errorAlert = this.alertCtrl.create(this.errorAlertObj);

    switch (this.mode) {
      case 'recipe':
        this.category.getRecipes(this.currentCategoryId).subscribe(
          (res: any) => {
            this.recipes = res.data
            refresher.complete()
          },
          err => {
            errorAlert.present()
            refresher.complete()
          }
        )
        break;
      case 'category':
        this.category.getCategories().subscribe(
          (res: any) => {
            this.categories = res.data
            refresher.complete()
          },
          err => {
            errorAlert.present()
            refresher.complete()
          }
        )
        break;
    }

  }

  doInfinite (infiniteScroll) {
    let errorAlert = this.alertCtrl.create(this.errorAlertObj);

    switch (this.mode) {
      case 'recipe':
        this.category.getRecipes(this.currentCategoryId).subscribe(
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
    this.recipes = []
    this.getCategories()
  }

  noResultFoundToast (message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  retry () {
    switch (this.mode) {
      case 'category':
        this.getCategories()
        break;
    }
  }  

  recipeSelected (recipeId) {
    this.navCtrl.push(RecipeInstructionsComponent, { recipeId })
  }

  searchRecipe ($event) {
    let { value } = $event.target

    if (!value) return;
    value = value.trim()

    let errorAlert = this.alertCtrl.create(this.errorAlertObj);
    
    if (value !== '') {
      this.sayText(value)
      this.mode = 'recipe'
      this.recipe.searchRecipe(value).subscribe(
        (res: any) => {
          let { success, message, data } = res
          if (success) {
            this.currentTitle = `Results for "${value}"`
            this.recipes = data
          } else {
            this.noResultFoundToast(message)
            this.currentTitle = 'Back to categories'
          }
        },
        () => {
          errorAlert.present()
        }
      )
    }
  }

  async sayText(keyword) : Promise<any> {
    try {
      await this.tts.speak(keyword)
    } catch (error) {
      console.log(error)
    }
  }

}
