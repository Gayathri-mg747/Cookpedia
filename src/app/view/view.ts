import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { toSignal } from '@angular/core/rxjs-interop';
import  jsPDF  from 'jspdf'
import  autoTable  from 'jspdf-autotable'

@Component({
  selector: 'app-view',
  imports: [AsyncPipe,Header,Footer,RouterLink ],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {

  route = inject(ActivatedRoute)
  recipeId = this.route.snapshot.params['id']
  api = inject(Api)
  recipe$ = this.api.viewRecipeAPI(this.recipeId)
  allRelatedRecipes:any = signal([])
  router = inject(Router)

  ngOnInit(){
    this.recipe$.subscribe((res:any)=>{
      this.getAllRelatedRecipes(this.recipeId,res.cuisine)
    })
  }

  getAllRelatedRecipes(id:string,cuisine:string){
    this.api.getAllRelatedRecipesAPI(id,cuisine).subscribe((res:any)=>{
      this.allRelatedRecipes.set(res)
      // console.log(this.allRelatedRecipes());   
    })
  }

  viewRecipeFromRelatedRecipes(id:string,cuisine:string){
    this.recipe$ = this.api.viewRecipeAPI(id)
    this.getAllRelatedRecipes(id,cuisine)
    // move to view recipe page
    this.router.navigateByUrl(`/recipes/${id}`)
  }

  saveRecipe(){
    this.recipe$.subscribe((res:any)=>{
      this.addToUserCollection(res._id,res.name,res.image)     
    })
  }

  addToUserCollection(id:string,name:string,image:string){
    this.api.addRecipeToUserCollectionAPI(id,{name,image}).subscribe({
      next:(res:any)=>{
        alert(`${res.name} has successfully added to your collection`)
      },
      error:(err:any)=>{
        alert(err.error )
      }
    })
  }

  downloadRecipe(){
    this.recipe$.subscribe((res:any)=>{
      this.AddToUserDownloadList(res._id,res)     
    }) 
  }

  AddToUserDownloadList(id:string,recipe:any){
    this.api.downloadRecipeAPI(id,{name:recipe.name,image:recipe.image,cuisine:recipe.cuisine}).subscribe((res:any)=>{
      // generate pdf
      this.generatePDF(recipe)
    })  
  }

  generatePDF(recipe:any){
    let pdf = new jsPDF()
    let titleRow = [['Name','Cuisine','Ingredients','Instructions','Calories','Servings']]
    let bodyRow = [[recipe.name,recipe.cuisine,recipe.ingredients,recipe.instructions,recipe.caloriesPerServing,recipe.servings]]
    autoTable(pdf,{head:titleRow,body:bodyRow})
    pdf.save(`${recipe.name}.pdf`)
  }
}
