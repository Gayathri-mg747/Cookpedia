import { Component, inject } from '@angular/core';
import { Api } from '../services/api';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  api = inject(Api)
  name:String = ""
  email:String = ""
  message:String = ""

  submitFeedback(form:NgForm){
    this.api.saveFeedbackAPI({name:this.name,email:this.email,message:this.message}).subscribe((res:any)=>{
      alert("Thank you for your feedback...We appreciate your effort to improve us!!!")
      form.resetForm()
    })
  }

}
