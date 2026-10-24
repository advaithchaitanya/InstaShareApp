import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainService } from '../../Services/main.service';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auth',
  imports: [CommonModule,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
  
      constructor(public service:MainService,public router:Router,public cookie:CookieService){
       
      }
      ngOnInit(): void {
          const token = this.cookie.get(this.service.jwtKey);
          if (token) {
            this.router.navigate(['/main']);
          }
        }

      
      username!:string
      password!:string
      fullname!:string
      email!:string
      islogin=true;
      
      login(){
        if (!this.username || !this.password){
          return
        }
       this.service.login(this.username,this.password).subscribe({
        next:(value)=> {
          // console.log(value);
          this.service.setJwtToken(value.token)
          this.service.setRoles(value.roles)          
          console.log(this.cookie.get(this.service.jwtKey));
          this.router.navigate(['/main'])

        },
        error:(err)=>{
          console.log(err);
        }
       })

       
      }
      register(){
        if (!this.username || !this.password || !this.email || !this.fullname) return;

        this.service.register(this.username,this.password,this.email,this.fullname).subscribe({
          next:(res)=>{
            this.islogin=true;
            console.log(res);
            alert(res);
          },
          error:(err)=> {
            console.log(err);
          },
        })

      }

}
