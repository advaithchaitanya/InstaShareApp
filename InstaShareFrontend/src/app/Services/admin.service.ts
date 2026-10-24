import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  constructor(public http:HttpClient, public service:MainService) { }
  private baseUrl = 'http://localhost:8080/api/users/admin';

  private headers() {
    return {
      headers: {
        Authorization: `Bearer ${this.service.jwtToken}`
      }
    };
  }

  // 🔹 USERS
  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/get-all-users`, this.headers());
  }

  getAdmins(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/get-admin-users`, this.headers());
  }

  getBannedUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/get-banned-users`, this.headers());
  }

  // 🔹 POSTS / STORIES / COMMENTS
  getPosts(): Observable<GetPostsADTO[]> {
    return this.http.get<GetPostsADTO[]>(`${this.baseUrl}/get-posts`, this.headers());
  }

  getStories(): Observable<GetStoriesADTO[]> {
    return this.http.get<GetStoriesADTO[]>(`${this.baseUrl}/get-stories`, this.headers());
  }

  getComments(): Observable<GetCommentsADTO[]> {
    return this.http.get<GetCommentsADTO[]>(`${this.baseUrl}/get-comments`, this.headers());
  }

  // 🔹 DASHBOARD STATS
  getStats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.baseUrl}/stats/users`, this.headers());
  }

  // 🔹 ACTIONS (Ban / Unban / Verify / Unverify)
  banUser(userId: string, reason: string, daysBanned: number): Observable<UserDTO> {
    return this.http.put<UserDTO>(
      `http://localhost:8080/api/admin/ban/${userId}`,
      { reason, daysBanned },
      this.headers()
    );
  }

  unbanUser(userId: string): Observable<UserDTO> {
    return this.http.put<UserDTO>(
      `http://localhost:8080/api/admin/unban/${userId}`,
      {},
      this.headers()
    );
  }

  verifyUser(userId: string): Observable<UserDTO> {
    return this.http.put<UserDTO>(
      `http://localhost:8080/api/admin/verify/${userId}`,
      {},
      this.headers()
    );
  }

  unverifyUser(userId: string): Observable<UserDTO> {
    return this.http.put<UserDTO>(
      `http://localhost:8080/api/admin/unverify/${userId}`,
      {},
      this.headers()
    );
  }
  createAdmin(admin: {username:string, password:string, fullName:string, email:string, profileImageUrl?:string}) {
  return this.http.post<UserDTO>(
    `http://localhost:8080/api/admin/create-admin`,
    admin,
    this.headers()
  );
}
}


export interface UserDTO {
  userId: string;
  username: string;
  profileImageUrl: string | null;
  roles: string[];
  banned: boolean;
  varified:boolean;
}

// POSTS
export interface GetPostsADTO {
  id: string;
  imageUrl: string;
  userId: string;
  userName: string;
  profileImageUrl: string | null;
  caption:string |null;
  userIsBanned: boolean;
  varified:boolean;
  createdAt: string; // can parse as Date in component
}

// STORIES
export interface GetStoriesADTO {
  id: string;
  imageUrl: string;
  userId: string;
  userName: string;
  profileImageUrl: string | null;
  userIsBanned: boolean;
  varified:boolean;
  createdAt: string;
}

// COMMENTS
export interface GetCommentsADTO {
  id: string;
  commentText: string;
  userId: string;
  userName: string;
  profileImageUrl: string | null;
  userIsBanned: boolean;
  createdAt: string;
  varified:boolean;
}

// DASHBOARD STATS
export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  totalBanned: number;
  totalPosts: number;
  totalStories: number;
  totalComments: number;
}
