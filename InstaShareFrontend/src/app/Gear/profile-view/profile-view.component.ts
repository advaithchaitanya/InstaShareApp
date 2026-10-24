import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { UserService } from '../../Services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']  // fixed
})
export class ProfileViewComponent implements OnChanges, OnInit {
  @Input() profileData!: any;
  @Input() isMe!: boolean;
  following = false;

  activeTab: 'posts' | 'liked' | 'saved' = 'posts';
  likedPosts: any[] = [];
  savedPosts: any[] = [];

  constructor(public service: MainService, public userService: UserService,public router:Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profileData'] && this.profileData) {
      const user = this.userService.getCurrentUser();
      if (user) {
        this.following = this.profileData.profile.followers.some(
          (follower: any) => follower.userId === user.id
        );
        // alert("hey its me")
        this.isMe = user.id === this.profileData.id;
      }
    }
  }

  ngOnInit(): void {
    // Load liked posts
    this.service.getMyLikes().subscribe({
      next: (value) => {
        this.likedPosts = value;
      },
      error: (err) => console.log(err)
    });

    // Load saved posts
    this.service.getMySaved().subscribe({
      next: (value) => {
        this.savedPosts = value;
      },
      error: (err) => console.log(err)
    });
  }

  setActiveTab(tab: 'posts' | 'liked' | 'saved') {
    this.activeTab = tab;
  }

  toggleFollow() {
    if (!this.following) {
      this.follow();
    } else {
      this.unfollow();
    }
  }

  private follow() {
    this.service.followUser(this.profileData.id).subscribe({
      next: (res) => {
        this.following = true;
        this.profileData.profile.followersCount++;
        this.profileData.profile.followers.push(res);
      },
      error: (err) => console.log(err)
    });
  }

  private unfollow() {
    this.service.unfollow(this.profileData.id).subscribe({
      next: (res) => {
        this.following = false;
        this.profileData.profile.followersCount--;
        this.profileData.profile.followers = this.profileData.profile.followers.filter(
          (f: any) => f.userId !== res.userId
        );
      },
      error: (err) => console.log(err)
    });
  }
    onLogout(){
    this.service.deleteJwtKey();
    this.router.navigate(["/"])
  }
  backToHome(){
    this.router.navigate(["/main/home"])

  }
}
