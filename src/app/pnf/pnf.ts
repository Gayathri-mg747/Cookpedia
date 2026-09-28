import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pnf',
  imports: [RouterLink],
  templateUrl: './pnf.html',
  styleUrl: './pnf.css',
})
export class Pnf {
  role:string = "user"

  ngOnInit(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.role = user.role
    }
  }
  
}
