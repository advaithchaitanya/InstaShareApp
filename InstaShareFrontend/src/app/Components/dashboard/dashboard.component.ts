import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService, AdminStats, GetCommentsADTO, GetPostsADTO, GetStoriesADTO, UserDTO } from '../../Services/admin.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   selectedPage: string = 'users';
  varifiedLogoUrl=". console.log(data)"
  // Data arrays
  users: UserDTO[] = [];
  admins: UserDTO[] = [];
  bannedUsers: UserDTO[] = [];
  posts: GetPostsADTO[] = [];
  stories: GetStoriesADTO[] = [];
  comments: GetCommentsADTO[] = [];

  stats: AdminStats = {
    totalUsers: 0,
    totalAdmins: 0,
    totalBanned: 0,
    totalPosts: 0,
    totalStories: 0,
    totalComments: 0
  };

  loading = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadStats();
    this.setPage('users');
  }

  setPage(page: string) {
    this.selectedPage = page;
    this.loadData(page);
  }

  loadStats() {
    this.adminService.getStats().subscribe(stats => this.stats = stats);
  }

  loadData(page: string) {
    this.loading = true;

    switch (page) {
      case 'users':
        this.adminService.getUsers().subscribe(data => { this.users = data; this.loading = false; console.log(data); });
        break;
      case 'admins':
        this.adminService.getAdmins().subscribe(data => { this.admins = data; this.loading = false; console.log(data);});
        break;
      case 'banned':
        this.adminService.getBannedUsers().subscribe(data => { this.bannedUsers = data; this.loading = false;  console.log(data)});
        break;
      case 'posts':
        this.adminService.getPosts().subscribe(data => { this.posts = data; this.loading = false; console.log(data) });
        break;
      case 'stories':
        this.adminService.getStories().subscribe(data => { this.stories = data; this.loading = false; console.log(data) });
        break;
      case 'comments':
        this.adminService.getComments().subscribe(data => { this.comments = data; this.loading = false; console.log(data) });
        break;
      case 'createAdmin':
          break;
      default:
        this.loading = false;
        break;
    }
  }
    banUser(u:UserDTO, reason: string = 'Violation of rules', days: number = 7) {
    this.adminService.banUser(u.userId, reason, days).subscribe(updated => {
      u.banned=true
      console.log('Banned:', updated);
      this.refreshCurrentPage();
    });
  }
  
  unbanUser(u: UserDTO) {
      u.banned=false
    this.adminService.unbanUser(u.userId).subscribe(updated => {
      console.log('Unbanned:', updated);
      this.refreshCurrentPage();
    });
  }

  verifyUser(u:UserDTO) {
    this.adminService.verifyUser(u.userId).subscribe(updated => {
      u.varified=true
      console.log('Verified:', updated);
      this.refreshCurrentPage();
    });
  }

  unverifyUser(u:UserDTO) {
    this.adminService.unverifyUser(u.userId).subscribe(updated => {
      u.varified=false
      console.log('Unverified:', updated);
      this.refreshCurrentPage();
    });
  }

  // helper to reload the current list after an action
  private refreshCurrentPage() {
    this.loadStats();
    this.loadData(this.selectedPage);
  }
  newAdmin = {
  username: '',
  password: '',
  fullName: '',
  email: '',
  profileImageUrl: 'https://imgs.search.brave.com/gI1LMTLDwf4Ea16M4trLCUCHEj8sGFY2nbEIFGFDXEA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/My8xNy9tYWxlLWF2/YXRhci1wcm9maWxl/LXBpY3R1cmUtZ29s/ZC1tZW1iZXItc2ls/aG91ZXR0ZS12ZWN0/b3ItNTM1MTMxNy5q/cGc'
};

successMessage: string = '';
errorMessage: string = '';

createAdmin() {
  // Reset messages
  this.successMessage = '';
  this.errorMessage = '';

  this.adminService.createAdmin(this.newAdmin).subscribe({
    next: (res) => {
      this.successMessage = `Admin ${res.username} created successfully!`;
      this.errorMessage = '';
      this.newAdmin = { username: '', password: '', fullName: '', email: '', profileImageUrl: '' };
      // Refresh admin list
      this.loadData('admins');
      this.loadStats();
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = err.error?.message || 'Failed to create admin';
    }
  });
}
}