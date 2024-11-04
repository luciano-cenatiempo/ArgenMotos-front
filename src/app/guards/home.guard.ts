import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const homeGuard = () => {
    const router = inject(Router);

    if(localStorage.getItem('token')){
        router.navigate(['/home']);
        return false;
    }else{
       
        return true;
    }
}