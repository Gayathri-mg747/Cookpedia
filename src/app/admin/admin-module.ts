import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { RecipeList } from './recipe-list/recipe-list';
import { UsersList } from './users-list/users-list';
import { DownloadList } from './download-list/download-list';
import { FeedbackList } from './feedback-list/feedback-list';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { AdminHeader } from './admin-header/admin-header';
import { AdminSidebar } from './admin-sidebar/admin-sidebar';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    Dashboard,
    RecipeList,
    UsersList,
    DownloadList,
    FeedbackList,
    ManageRecipe,
    AdminHeader,
    AdminSidebar,
  ],
  imports: [CommonModule, AdminRoutingModule,SearchPipe,FormsModule,MatCardModule, MatDatepickerModule,BaseChartDirective],
  providers: [provideNativeDateAdapter(),provideCharts(withDefaultRegisterables())]
})
export class AdminModule {}
