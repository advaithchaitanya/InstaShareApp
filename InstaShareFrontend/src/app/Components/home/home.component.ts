import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsComponent } from '../../Gear/posts/posts.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [SlickCarouselModule,CommonModule,FormsModule,PostsComponent,RouterModule],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit   {
  constructor(public service:MainService){} 
  stories!:any[any]
  posts!:any[any]
  loadingStories=false 
  loadingPosts=false 
  ngOnInit(){
      this.getStories()
      this.getAllPost()
      }
   getStories(){
    this.loadingStories=true
    this.service.getStories().subscribe({
        next:(res)=>{
          console.log(res);
          this.loadingStories=false
          this.stories=res
          console.log(this.stories);
          // console.log(this.stories);
          
        },
        error:(err)=>{
          this.loadingStories=false
          console.log("Youve got",err)
        }
      })
   }
   getAllPost(){
    this.loadingPosts=true;
    this.service.getAllPosts().subscribe({
      next:(res)=>{
        console.log(res)
        this.loadingPosts=false
        this.posts=res
      },
      error:(err)=>{
        this.loadingPosts=false
        console.log(err)
      }
    })
   }
   
   
   slideConfig = {
  slidesToShow: 5,
  slidesToScroll: 4,
   arrows: true,
    prevArrow: '<button class="slick-prev custom-prev">←</button>',
  nextArrow: '<button class="slick-next custom-next">→</button>',
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 4 ,slidesToScroll:2} },
    { breakpoint: 600, settings: { slidesToShow: 4 ,slidesToScroll:2} },
    { breakpoint: 450, settings: { slidesToShow: 3,slidesToScroll:2 } },
    { breakpoint: 380, settings: { slidesToShow: 2,slidesToScroll:2 } },
    { breakpoint: 250, settings: { slidesToShow: 1,slidesToScroll:1 } },
  ]
};   
}
