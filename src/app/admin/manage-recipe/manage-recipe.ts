import { Component, inject, signal } from '@angular/core';
import { RecipeModel } from '../models/recipeModel';
import { Api } from '../../services/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {

  route = inject(ActivatedRoute)
  recipeId = this.route.snapshot.params['id']
  api = inject(Api)
  recipeDetails = signal<RecipeModel>({})
  ingredientArray:any = []
  instructionArray:any = []
  mealTypeArray:any = []

  ngOnInit(){
    if(this.recipeId){
      this.api.viewRecipeAPI(this.recipeId).subscribe((res:any)=>{
        this.recipeDetails.set(res)
        this.ingredientArray = this.recipeDetails().ingredients
        this.instructionArray = this.recipeDetails().instructions
        this.mealTypeArray = this.recipeDetails().mealType
      })
    }
  }

  addIngredient(ingredientInput:HTMLTextAreaElement){
    if(ingredientInput.value){
      this.ingredientArray.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }

  addInstruction(instructionInput:HTMLTextAreaElement){
    if(instructionInput.value){
      this.instructionArray.push(instructionInput.value)
      instructionInput.value = ""
    }
  }

  addMeal(mealInput:HTMLTextAreaElement){
    if(mealInput.value){
      this.mealTypeArray.push(mealInput.value)
      mealInput.value = ""
    }
  }

  removeIngredient(value:string){
    this.ingredientArray = this.ingredientArray.filter((item:string)=>item!=value)
  }

  removeInstruction(value:string){
    this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
  }

  removeMeal(value:string){
    this.mealTypeArray = this.mealTypeArray.filter((item:string)=>item!=value)
  }

  addRecipe(){
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.mealTypeArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails()
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      this.api.addRecipeAPI(this.recipeDetails()).subscribe({
        next:(res:any)=>{
          alert("Recipe added successfully!!!")
          this.recipeDetails.set({})
          this.ingredientArray = []
          this.instructionArray = []
          this.mealTypeArray = []
        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })
    }else{
      alert("Fill the form completely!!!")
    }
  }

    updateRecipe(){
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.mealTypeArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails()
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      this.api.updateRecipeAPI(this.recipeId,this.recipeDetails()).subscribe((res:any)=>{
        alert("Recipe updated successfully!!!")
      })
    }else{
      alert("Fill the form completely!!!")
    }
  }

}
