import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/activity';

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token()}`
    });
  }

  getPublications() {
    return this.http.get(`${this.apiUrl}/publications`, { headers: this.getHeaders() });
  }

  getPublication(id: number | string) {
    return this.http.get(`${this.apiUrl}/publications/${id}`, { headers: this.getHeaders() });
  }

  readPublication(id: number) {
    return this.http.post(`${this.apiUrl}/publications/${id}/read`, {}, { headers: this.getHeaders() });
  }

  getBrs() {
    return this.http.get(`${this.apiUrl}/brs`, { headers: this.getHeaders() });
  }

  readBrs(id: number) {
    return this.http.post(`${this.apiUrl}/brs/${id}/read`, {}, { headers: this.getHeaders() });
  }
}
