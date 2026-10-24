import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MainService } from './Services/main.service';
import { UserService } from './Services/user.service';
import Aos, * as AOS from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Aos.init()
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit,OnChanges{
  constructor(public service:UserService,public mservice:MainService,public router:Router){}

  ngOnInit(): void {
       AOS.init({
      duration: 800,    // global animation duration
      easing: 'ease-in-out',
      // once: true,       // animation happens only once
      mirror: false     // elements animate out while scrolling past them
    });
    this.service.loadCurrentUser();
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    // changes.coo
  }
  
  title = 'App';
onLogout(){
    this.mservice.deleteJwtKey();
    this.router.navigate(["/"])
  
}
}


export interface MyDetailsDTO {
  id: string;
  username: string;
  profileImageUrl: string;
  roles:string[],
  banned:boolean

}