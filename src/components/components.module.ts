import { NgModule } from '@angular/core';
import { RecipeInstructionsComponent } from './recipe-instructions/recipe-instructions';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes';
@NgModule({
	declarations: [RecipeInstructionsComponent,
    SavedRecipesComponent],
	imports: [],
	exports: [RecipeInstructionsComponent,
    SavedRecipesComponent]
})
export class ComponentsModule {}
