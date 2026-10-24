import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainService } from '../../Services/main.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-posts',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent implements OnInit {
    @Input() i!:any
    ngOnInit(): void {
      this.config()
      
    }
    config(){
      const myLike= this.userService.getCurrentUser();
      if (myLike){
        const myLiked=this.i.likes.some((l:any)=>l.userId===myLike.id)
        if (myLiked){
          this.liked=true
        }
        const mySaved=this.i.saves.some((l:any)=>l.userId===myLike.id)
        if (mySaved){
          this.saved=true
        }
      }
    }
    constructor(public service:MainService,public userService:UserService){}
    liked=false
    commentsh=false
    saved=false
    commentText='';
    like(){
      if (!this.liked){
        this.service.postLike(this.i.id).subscribe({
        next:(res)=>{
          this.liked=!this.liked
          this.i.likes.push(res)
          
          console.log(res)

        },
        error:(err)=> {
          alert("something happend");
          console.log(err)
        },
      })
      }
      else{
        this.service.postUnLike(this.i.id).subscribe({
        next:(res)=>{
          this.liked=!this.liked
         
          console.log(res)

        },
        error:(err)=> {
          alert("something happend");
          console.log(err)
        },
      })
      }
    }
    comment(id:string){
      if (!this.commentText.trim()) return;
      this.service.createComment(id,this.commentText).subscribe({
        next:(value)=> {
          console.log(value);
          this.i.comments.push(value)
        },
        error:(err)=> {
          console.log(err);
        },
      })
    }
    save(){
      if (!this.saved){

        this.service.savePost(this.i.id).subscribe({
          next:(value)=> {
            console.log(value);
            this.saved=!this.saved
          },
          error:(err)=> {
            console.log(err);
          },
        })
      }
      else{
        this.service.unsavePost(this.i.id).subscribe({
          next:(value)=> {
            console.log(value);
            this.saved=!this.saved
          },
          error:(err)=> {
            console.log(err);
          },
        })
        
      }
    }

}
