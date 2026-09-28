import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm:FormGroup
  fb = inject(FormBuilder)
  api = inject(Api)
  router = inject(Router)

  constructor(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  submitLoginForm(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.api.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
          alert("Hi user, Welcome to Cookpedia!!!")
          sessionStorage.setItem("token",res.token)
          sessionStorage.setItem("user",JSON.stringify(res.user))
          this.loginForm.reset()
          if(res.user.role=="user"){
            this.router.navigateByUrl('/')
          }else{
            this.router.navigateByUrl('/admin')
          }
        },
        error:(reason:any)=>{
          alert(reason.error)
        }    
      })
    }else{
      this.loginForm.reset()
      alert("Invalid Form!!! Fill the form with valid data")
    }
  }

}
