import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../../Gear/posts/posts.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from '../../Services/main.service';

@Component({
  selector: 'app-post-view',
  imports: [PostsComponent,CommonModule,FormsModule],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css'
})
export class PostViewComponent implements OnInit{
  loadingPosts=false;
  post:any;
  constructor(public route:ActivatedRoute,public http:HttpClient,public main:MainService,){
    
  }
  id!:any
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id")
    if (this.id==null) {
      alert("null")
    };
    this.main.getPost(this.id).subscribe({
      next:(res)=>{
        this.post=res
      },error:(error)=>{
        console.error(error);
      }
    })
  }
  getImage():Observable<any>{
    return this.http.get<any>("");

  }


}
