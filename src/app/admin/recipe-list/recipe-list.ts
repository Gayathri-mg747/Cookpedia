import { Component, inject, signal } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {

  api = inject(Api)
  allRecipes:any = signal([])
  searchKey:string = ""

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes.set(res)
    })
  }

  removeRecipe(id:string){
    if(confirm('Are you sure, do you want to remove the recipe?')){
      this.api.removeRecipeAPI(id).subscribe((res:any)=>{
        alert("Recipe removed!!!")
        this.getAllRecipes()
    })
    }
  }

}


