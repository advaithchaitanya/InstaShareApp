import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileViewComponent } from '../../Gear/profile-view/profile-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ProfileViewComponent,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(public service: MainService, public route: ActivatedRoute) {}
  paramId: any;
  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.getProfileData();
  }
  getProfileData() {
    this.loading=true
    this.service.getUserProfileData(this.paramId).subscribe({
      next: (res) => {
        this.loading=false
        console.log(res);
        this.profileData = res;
      },
      error: (err) => {
        this.loading=false
        console.log("we've got", err);
      },
    });
  }
  loading = false;
  profileData: any;
}
