import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { RecipeList } from './recipe-list/recipe-list';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { UsersList } from './users-list/users-list';
import { DownloadList } from './download-list/download-list';
import { FeedbackList } from './feedback-list/feedback-list';

const routes: Routes = [
  //dashboard : http://localhost:4200/admin
  {
    path:'', component:Dashboard, title:"Admin - Dashboard"
  },
  {
    path:'recipes', component:RecipeList, title:"Admin - All Recipes"
  },
  {
    path:'recipes/add', component:ManageRecipe, title:"Admin - Add Recipe"
  },
  {
    path:'recipes/:id', component:ManageRecipe, title:"Admin - Update Recipe"
  },
  {
    path:'users', component:UsersList, title:"Admin - All Users"
  },
  {
    path:'downloads', component:DownloadList, title:"Admin - All Downloads"
  },
  {
    path:'feedbacks', component:FeedbackList, title:"Admin - All Feedbacks"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
