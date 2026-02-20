import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api';

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token()}`
    });
  }

  getMyProfile() {
    return this.http.get(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }

  updateProfile(userData: any) {
    return this.http.patch(`${this.apiUrl}/me/update`, userData, { headers: this.getHeaders() });
  }

  getMyProgress() {
    return this.http.get(`${this.apiUrl}/me/progress`, { headers: this.getHeaders() });
  }

  getLeaderboard(category: string = 'points') {
    return this.http.get(`${this.apiUrl}/leaderboard?category=${category}`, { headers: this.getHeaders() });
  }

  searchUsers(query: string) {
    return this.http.get(`${this.apiUrl}/users/search?q=${query}`, { headers: this.getHeaders() });
  }

  setActiveCourse(courseId: number) {
    return this.http.patch(`${this.apiUrl}/me/active-course`, { courseId }, { headers: this.getHeaders() });
  }
}
