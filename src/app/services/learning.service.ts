import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LearningService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/courses';

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token()}`
    });
  }

  getCourses() {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getCourseById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getUnits(courseId: number) {
    return this.http.get(`${this.apiUrl}/${courseId}/units`, { headers: this.getHeaders() });
  }

  getLessons(unitId: number) {
    return this.http.get(`${this.apiUrl}/units/${unitId}/lessons`, { headers: this.getHeaders() });
  }

  getChallenges(lessonId: number) {
    return this.http.get(`${this.apiUrl}/lessons/${lessonId}/challenges`, { headers: this.getHeaders() });
  }

  unlockUnit(unitId: number) {
    return this.http.post(`${this.apiUrl}/units/unlock`, { unitId }, { headers: this.getHeaders() });
  }

  submitChallenge(submission: any) {
    return this.http.post(`${this.apiUrl}/lessons/challenges/submit`, submission, { headers: this.getHeaders() });
  }
}
