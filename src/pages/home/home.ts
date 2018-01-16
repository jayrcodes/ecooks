import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RecipeInstructionsComponent } from '../../components/recipe-instructions/recipe-instructions'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // entryComponents: [
  //   RecipeInstructionsComponent
  // ]
})
export class HomePage {
  text: string;
  recipes = [];

  constructor(
    public navCtrl: NavController,
    private tts: TextToSpeech
   ) {
    this.recipes = [
      {
        id: 1,
        name: 'Fried Chicken'
      },
      {
        id: 2,
        name: 'Adobo'
      },
      {
        id: 3,
        name: 'Tinola'
      },
      {
        id: 4,
        name: 'Bagnet'
      },
    ]
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
}
