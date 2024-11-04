import { Component, inject } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { Router, RouteReuseStrategy } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'argenmoto';
  router = inject(Router)
  login:boolean = false
  constructor(
    private _userService :UserService
  ){
    this.login = this._userService.isLogged();
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login'])
  }

}
