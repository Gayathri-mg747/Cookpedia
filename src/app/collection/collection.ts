import { Component, inject, signal } from '@angular/core';
import { Api } from '../services/api';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection',
  imports: [Header,Footer,RouterLink],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {

  api = inject(Api)
  recipeCollection:any = signal([])

  ngOnInit(){
    this.getUserCollection()
  }

  getUserCollection(){
    this.api.getUserRecipeCollectionAPI().subscribe((res:any)=>{
      this.recipeCollection.set(res)
      console.log(this.recipeCollection());    
    })
  }

  removeRecipe(id:string){
    this.api.removeUserRecipeCollectionAPI(id).subscribe((res:any)=>{
      alert(`${res.name} has been removed from your collection!!!`)
      this.getUserCollection()
    })
  }
}
