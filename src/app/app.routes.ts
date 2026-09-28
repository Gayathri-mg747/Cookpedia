import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { Collection } from './collection/collection';
import { View } from './view/view';
import { Pnf } from './pnf/pnf';
import { authGuard } from './guards/auth-guard';
import { adminAuthGuard } from './guards/admin-auth-guard';

export const routes: Routes = [
    //lazy loaded module path : http://localhost:4200/admin
    {
        path:'admin',canActivate:[adminAuthGuard] ,loadChildren:()=>import('./admin/admin-module').then(module=>module.AdminModule)
    },
    //http://localhost:4200/ - Home
    {
        path:'', component:Home, title:"Home"
    },
    //http://localhost:4200/ - recipes
    {
        path:'recipes', component:Recipes, title:"All Recipes"
    },//http://localhost:4200/ - about
    {
        path:'about', component:About, title:"About"
    },
    //http://localhost:4200/ - contact
    {
        path:'contact', component:Contact, title:"Contact"
    },//http://localhost:4200/ - Login
    {
        path:'login', component:Login, title:"Login"
    },//http://localhost:4200/ - Register
    {
        path:'register', component:Register, title:"Register"
    },//http://localhost:4200/ - Profile 
    {
        path:'profile',canActivate:[authGuard], component:Profile, title:"User Profile"
    },//http://localhost:4200/ - Collection 
    {
        path:'recipes/save',canActivate:[authGuard], component:Collection, title:"User Collection"
    }, //http://localhost:4200/ - View
    {
        path:'recipes/:id',canActivate:[authGuard], component:View, title:"View Recipe"
    },//http://localhost:4200/ - page not found
    {
        path:'**', component:Pnf, title:"Page Not Found"
    }
];
