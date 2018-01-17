import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../components/home/home';
import { RecipeInstructionsComponent } from '../components/recipe-instructions/recipe-instructions';
import { SavedRecipesComponent } from '../components/saved-recipes/saved-recipes';

// Libraries
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RecipeProvider } from '../providers/recipe/recipe';
import { CategoryProvider } from '../providers/category/category';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecipeInstructionsComponent,
    SavedRecipesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecipeInstructionsComponent,
    SavedRecipesComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TextToSpeech,
    RecipeProvider,
    CategoryProvider
  ]
})
export class AppModule {}
