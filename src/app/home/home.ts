import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { AdminRoutingModule } from '../admin/admin-routing-module';
import { RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { AsyncPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Header,Footer,AdminRoutingModule,RouterLink,AsyncPipe,SlicePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

    api = inject(Api)
    allRecipes$ = this.api.getAllRecipesAPI()
    allApproveFeedbacks$ = this.api.getAllApproveFeedbacksAPI()
}
