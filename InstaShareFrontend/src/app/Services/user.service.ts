import { Injectable } from '@angular/core';
import { MyDetailsDTO } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { MainService } from './main.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: MyDetailsDTO | null = null;
   isLoaded = false; // so we don’t refetch on every call
  isBanned=false

  constructor(private http: HttpClient,public mainService:MainService,public router:Router) {}
checkIsAdmin():boolean{
   const roles = this.mainService.getRoles();
const adminRoles = ['ROLE_ADMIN', 'ROLE_OWNER'];

return roles.some((role:any) => adminRoles.includes(role));
}

loadCurrentUser() {
  if (this.isLoaded) return; // prevent duplicate requests
  
  this.mainService.getMe().subscribe({
    next: (user) => {
      this.currentUser = user;
      this.isLoaded = true;
      console.log('Current user loaded:', user);

      // Check ban status
     
      if (user.banned) {
        this.isBanned=true
        document.body.style.overflow = 'hidden'; // disable scrolling
      } else {
        document.body.style.overflow = 'auto'; // restore scroll
      }
    },
    
    error: (err) => {
      console.log('Could not load user', err);
      this.currentUser = null;
      this.isLoaded = true;
      localStorage.removeItem('isBanned');
    },
  });
}


  getCurrentUser(): MyDetailsDTO | null {
    // console.log(this.currentUser);
    return this.currentUser;
  }

  
  setCurrentUser(user: MyDetailsDTO | null) {
    this.currentUser = user;
    this.isLoaded = true;
  }

  clearUser() {
    this.currentUser = null;
    this.isLoaded = false;
  }
  
}
