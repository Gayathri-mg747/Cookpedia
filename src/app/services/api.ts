import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../admin/models/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class Api {
  
  server_url:string = "http://localhost:3000"
  http = inject(HttpClient)

  // get http://localhost:3000/recipes : get request by Home & Recipe component when page loads
  getAllRecipesAPI():Observable<any[]>{
    return this.http.get<any[]>(`${this.server_url}/recipes`)
  }

  //http://localhost:3000/feedbacks : post request by contact component when submit button clicked
  saveFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedbacks`,reqBody)
  }

 // http://localhost:3000/register : post request by Register component when register btn clicked
 registerAPI(reqBody:any){
  return this.http.post(`${this.server_url}/register`,reqBody)
 }

 // http://localhost:3000/login : post request by Login component when login btn clicked
 loginAPI(reqBody:any){
  return this.http.post(`${this.server_url}/login`,reqBody)
 }

 // http://localhost:3000/recipes/6a605f62394df463625802d4 : get request by view component when page open
  viewRecipeAPI(recipeId:string):Observable<any>{
    return this.http.get<any>(`${this.server_url}/recipes/${recipeId}`)
  }
  // http://localhost:3000/related-recipes/6a605f62394df463625802c6?cuisine=Italian : get request by view component when page open
  getAllRelatedRecipesAPI(recipeId:string,cuisine:string):Observable<any>{
    return this.http.get<any>(`${this.server_url}/related-recipes/${recipeId}?cuisine=${cuisine}`)
  }

  // http://localhost:3000/user-collection/6a605f62394df463625802d6 : post request by view component when save recipe btn clicked
  addRecipeToUserCollectionAPI(recipeId:string,recipe:any)  {
    return this.http.post<any>(`${this.server_url}/user-collection/${recipeId}`,recipe)
  }
  // http://localhost:3000/user-collection : get request by collection component when page opens
  getUserRecipeCollectionAPI(){
    return this.http.get<any>(`${this.server_url}/user-collection`)
  }
  // http://localhost:3000/user-collection/id : get request by collection component when delete btn clicks
  removeUserRecipeCollectionAPI(id:string){
    return this.http.delete(`${this.server_url}/user-collection/${id}`)
  }
  // http://localhost:3000/download/6a605f62394df463625802d9 : post request by view component when download btn clicked
  downloadRecipeAPI(recipeId:string,recipe:any){
    return this.http.post(`${this.server_url}/download/${recipeId}`,recipe)
  }    
  // http://localhost:3000/user-downloads : get request by profile component when page open 
  getUserDownloadListAPI():Observable<any>{
    return this.http.get<any>(`${this.server_url}/user-downloads`)
  }

  // http://localhost:3000/users/6a6852f38e52b5127b42c678 : put request by profile component when picture uploads
  editUserProfileAPI(userId:string,reqBody:any){
    return this.http.put(`${this.server_url}/users/${userId}`,reqBody)
  }    

  // http://localhost:3000/feedbacks : get request by admin feedback component when page open
  getFeedbackListAPI():Observable<any>{
    return this.http.get<any>(`${this.server_url}/feedbacks`)
  }

  // http://localhost:3000/downloads : get request by admin download list when page open
  getAllDownloadListAPI():Observable<any>{
    return this.http.get<any>(`${this.server_url}/downloads`)
  }
  // http://localhost:3000/users : get request by admin users list when page open
  getAllUserListAPI():Observable<any>{
    return this.http.get<any>(`${this.server_url}/users`)
  }

  // http://localhost:3000/feedbacks/6a6457d349a7180970386951 : put request by feedbacklist component when approve/cancel btn clicked
    editFeedbackStatusAPI(id:string,reqBody:any){
    return this.http.put<any>(`${this.server_url}/feedbacks/${id}`,reqBody)
  }

  // http://localhost:3000/approve-feedbacks : get request by home component when page loads
  getAllApproveFeedbacksAPI():Observable<any>{
    return this.http.get<any>(`${this.server_url}/approve-feedbacks`)
  }

  // http://localhost:3000/recipes : post request by manage recipe component when add recipe button clicked
  addRecipeAPI(recipe:RecipeModel)  {
    return this.http.post<any>(`${this.server_url}/recipes`,recipe)
  }

  // http://localhost:3000/recipes/6aab767be83cfeafcaff70e7 : put request by manage recipe component when update button clicked
  updateRecipeAPI(recipeId:string,recipe:RecipeModel)  {
    return this.http.put<any>(`${this.server_url}/recipes/${recipeId}`,recipe)
  }  

  // http://localhost:3000/recipes/6aab767be83cfeafcaff70e7 : delete request by admin recipes when delete btn clicked
  removeRecipeAPI(recipeId:string)  {
    return this.http.delete<any>(`${this.server_url}/recipes/${recipeId}`)
  }

}
