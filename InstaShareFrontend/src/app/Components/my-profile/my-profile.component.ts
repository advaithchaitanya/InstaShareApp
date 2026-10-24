import { Component, OnInit } from '@angular/core';
import { ProfileViewComponent } from '../../Gear/profile-view/profile-view.component';
import { MainService } from '../../Services/main.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-my-profile',
  imports: [ProfileViewComponent, CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  constructor(public service: MainService, public uservice: UserService) { }

  ngOnInit(): void {
    this.getProfileData()

  }
  fileUploadEventProfile(e:any) {
    this.profileFile=e.target.files[0];
    this.priviewUrlProfile=URL.createObjectURL(e.target.files[0]);
  }
  fileUploadEventPost(e:any) {
    this.postFile=e.target.files[0];
    this.priviewUrlPost=URL.createObjectURL(e.target.files[0]);
  }
  fileUploadEventStory(e:any) {
    this.storyFile=e.target.files[0];
    this.priviewUrlStory=URL.createObjectURL(e.target.files[0]);
  }
  profileData: any;
  
  profileUrlUpdateTab = true
  storyUrlTab=true
  postUrlTab=true

  
  postImageUrl!: string;
  imageUrlStory!: string;
  caption!: string;
  userBio = '';
  profileImageUrl = '';
  fullname = '';

  priviewUrlProfile="";
  priviewUrlPost="";
  priviewUrlStory="";

  profileFile:any;
  storyFile:any
  postFile:any

  updateProfile() {
    const dto = {
    profileImageUrl: this.profileImageUrl,
    userBio: this.userBio,
    fullname: this.fullname
  };

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(dto)], { type: "application/json" }));

    if (this.profileFile) {
      formData.append("imageFile", this.profileFile);
    }

    this.service.editMyProfile(formData).subscribe({
      next: (value) => {
        console.log(value);
        this.profileData.profile.userBio = value.profile.userBio
        this.profileData.fullName = value.fullName
        this.profileData.profile.profileImageUrl = value.profile.profileImageUrl
        // if (value.)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  createPost() {
    if (!this.postImageUrl && !this.postFile) return;
    // if (!this.caption) return;
    let formData=new FormData();
    if (this.postFile){
      formData.append("imageFile",this.postFile);
    }
    formData.append("data",new Blob([
      JSON.stringify({
      imageUrl:this.postImageUrl,
      caption:this.caption?this.caption:"post!!!!!"
    }),
    ],{type:"application/json"}));
    this.service.createPost(formData).subscribe({
      next: (value) => {
        console.log(value);
        this.profileData.profile.posts.push(value)
        alert("new post created")
        this.service.closeEdit()
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  createStory() {
    if (!this.imageUrlStory && !this.storyFile) return;
    let formData=new FormData();
    if (this.storyFile!=null){
      formData.append("imageFile",this.storyFile);
    }
    formData.append("data",this.imageUrlStory);
    this.service.createStory(formData).subscribe({
      next: (value) => {
        console.log(value);
        this.profileData.profile.stories.push(value)
        this.service.isStoryEdit=false
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  getProfileData() {
    this.loading = true
    this.service.getProfileData().subscribe({
      next: (res) => {
        this.loading = false
        console.log(res);
        this.profileData = res;
        this.userBio = this.profileData.profile.userBio
        this.fullname = this.profileData.fullName
        this.profileImageUrl = this.profileData.profile.profileImageUrl
        if (res.banned) {
          this.uservice.isBanned = true
        }
      },
      error: (err) => {
        this.loading = false
        console.log("we've got", err);
      },
    });
  }
  loading = false


}
