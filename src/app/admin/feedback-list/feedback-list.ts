import { Component, inject, signal } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-feedback-list',
  standalone: false,
  templateUrl: './feedback-list.html',
  styleUrl: './feedback-list.css',
})
export class FeedbackList {

  api = inject(Api)
  allFeedbacks:any = signal([])

  ngOnInit(){
    this.getAllFeedbacks()
  }

  getAllFeedbacks(){
    this.api.getFeedbackListAPI().subscribe((res:any)=>{
      this.allFeedbacks.set(res)
    })
  }

  updateFeedback(id:string,status:string){
    this.api.editFeedbackStatusAPI(id,{status}).subscribe((res:any)=>{
      this.getAllFeedbacks()
    })
  }
  
}
