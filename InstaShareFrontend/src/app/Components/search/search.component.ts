import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../../Gear/posts/posts.component';


@Component({
  selector: 'app-search',
  imports: [FormsModule,CommonModule,PostsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  constructor(public service:MainService){
    
  }

  ngOnInit(): void {
    // this.getAllPost()
    this.service.getSearched();
  }
    
  
  
}
