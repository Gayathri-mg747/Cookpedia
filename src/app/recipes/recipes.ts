import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Api } from '../services/api';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header,Footer,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  api = inject(Api)
  allRecipes:any = signal([])
  dummyAllRecipes:any[] = []
  cuisineArray:any = signal([])
  mealTypeArray:any = signal([])
  searchKey:string = ""
  p: number = 1;
  router = inject(Router)

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes.set(res)
      this.dummyAllRecipes = res
      // console.log(this.allRecipes());   
      const dummyCuisineArray = res.map((item:any)=>item.cuisine)
      dummyCuisineArray.forEach((item:any)=>{
        !this.cuisineArray().includes(item) && this.cuisineArray().push(item)
      })
      // console.log(this.cuisineArray());   
      const dummyMealArray = res.map((item:any)=>item.mealType).flat(1)
      dummyMealArray.forEach((item:any)=>{
        !this.mealTypeArray().includes(item) && this.mealTypeArray().push(item)
      })
    // console.log(this.mealTypeArray());
    })
  }

  filterRecipe(key:string,value:string){
    this.allRecipes.set(this.dummyAllRecipes.filter((item:any)=>item[key]==value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`/recipes/${recipeId}`)
    }else{
      alert("Please login to access our Recipe Collection")
      this.router.navigateByUrl('/login')
    }
  }

}
