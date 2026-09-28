import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Api } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  selected = new Date()
  barChartOptions:ChartConfiguration<'bar'>['options']={
    responsive:true,
    plugins:{
      legend:{
        display:false
      },
      title:{
        text:'Analysis of Downloaded Recipes Based on their Cuisine',
        display:true
      }
    }
  }
  barChartData:ChartConfiguration<'bar'>['data']={
    labels:['Italian','Asian','Chinese','Indian','Pakistani'],
    datasets:[{
      label:'Count',
      data:[3,4,5,1,5]
    }]
  }
  SidebarOpen:boolean = true
  router = inject(Router)
  api = inject(Api)
  userCount$ = this.api.getAllUserListAPI()
  recipeCount$ = this.api.getAllRecipesAPI()
  downloadCount$ = this.api.getAllDownloadListAPI()
  feedbackCount$ = this.api.getFeedbackListAPI()

  constructor(){
    this.downloadCount$.subscribe((res:any)=>{
      // console.log(res);
      let output:any = {}
      res.forEach((item:any)=>{
        let cuisine = item.cuisine
        let curCount = item.count
        if(cuisine in output){
          output[cuisine] += curCount
        }else{
          output[cuisine] = curCount
        }
      })
     // get all cuisine names in array
      const allCuisines = Object.keys(output)
     // get all download count of each cuisine names in array
      const allDownloadCount:Array<number> = Object.values(output)
     // update the barChartData property with cuisine and download count
      this.barChartData = {
        labels:allCuisines,
        datasets:[
          {
            label:'Count',
            data: allDownloadCount
          }
        ]
      }
    })
  }

  toggle(){
    this.SidebarOpen = !this.SidebarOpen
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
