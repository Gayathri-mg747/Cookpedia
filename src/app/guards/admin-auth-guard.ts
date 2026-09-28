import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("user") && sessionStorage.getItem("token")){
    const user = JSON.parse(sessionStorage.getItem("user") || "")
    if(user.role=="admin"){
      return true;
    }else{
      alert("Unauthorised Access!!! Operation Denied...")
      router.navigateByUrl('/pagenotfound')
      return false;
      }
    }else{
      alert("Unauthorised Access!!! Please Login...")
      router.navigateByUrl('/pagenotfound')
      return false;
    }
  
};

