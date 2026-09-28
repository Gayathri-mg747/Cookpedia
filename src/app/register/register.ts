import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Footer,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm:FormGroup
  fb = inject(FormBuilder)
  api = inject(Api)
  router = inject(Router)

  constructor(){
    this.registerForm = this.fb.group({
      username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  submitRegisterForm(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      this.api.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
          alert("Hi user, your registeration completed successfully")
        },
        error:(reason:any)=>{
          alert(reason.error)
        }    
      })
      this.registerForm.reset()
      this.router.navigateByUrl('/login')
    }else{
      alert("Invalid Form!!! Fill the form with valid data")
    }
  }

}
