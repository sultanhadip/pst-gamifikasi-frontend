import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/admin';

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token()}`
    });
  }

  // Courses
  createCourse(course: any) {
    return this.http.post(`${this.apiUrl}/courses`, course, { headers: this.getHeaders() });
  }

  updateCourse(id: number, course: any) {
    return this.http.put(`${this.apiUrl}/courses/${id}`, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/courses/${id}`, { headers: this.getHeaders() });
  }

  // Units
  createUnit(unit: any) {
    return this.http.post(`${this.apiUrl}/units`, unit, { headers: this.getHeaders() });
  }

  updateUnit(id: number, unit: any) {
    return this.http.put(`${this.apiUrl}/units/${id}`, unit, { headers: this.getHeaders() });
  }

  deleteUnit(id: number) {
    return this.http.delete(`${this.apiUrl}/units/${id}`, { headers: this.getHeaders() });
  }

  // Lessons
  createLesson(lesson: any) {
    return this.http.post(`${this.apiUrl}/lessons`, lesson, { headers: this.getHeaders() });
  }

  updateLesson(id: number, lesson: any) {
    return this.http.put(`${this.apiUrl}/lessons/${id}`, lesson, { headers: this.getHeaders() });
  }

  deleteLesson(id: number) {
    return this.http.delete(`${this.apiUrl}/lessons/${id}`, { headers: this.getHeaders() });
  }

  // Challenges
  createChallenge(challenge: any) {
    return this.http.post(`${this.apiUrl}/challenges`, challenge, { headers: this.getHeaders() });
  }

  updateChallenge(id: number, challenge: any) {
    return this.http.put(`${this.apiUrl}/challenges/${id}`, challenge, { headers: this.getHeaders() });
  }

  deleteChallenge(id: number) {
    return this.http.delete(`${this.apiUrl}/challenges/${id}`, { headers: this.getHeaders() });
  }

  // Users
  getAllUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  banUser(id: string) {
    return this.http.patch(`${this.apiUrl}/users/${id}/ban`, {}, { headers: this.getHeaders() });
  }

  unbanUser(id: string) {
    return this.http.patch(`${this.apiUrl}/users/${id}/unban`, {}, { headers: this.getHeaders() });
  }
}
