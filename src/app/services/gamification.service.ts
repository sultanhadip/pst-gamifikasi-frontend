import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8080/api/gamification';

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.token()}`
    });
  }

  getAchievements() {
    return this.http.get(`${this.apiUrl}/achievements`, { headers: this.getHeaders() });
  }

  getMyAchievements() {
    return this.http.get(`${this.apiUrl}/my-achievements`, { headers: this.getHeaders() });
  }

  getTitles() {
    return this.http.get(`${this.apiUrl}/titles`, { headers: this.getHeaders() });
  }

  getMyTitles() {
    return this.http.get(`${this.apiUrl}/my-titles`, { headers: this.getHeaders() });
  }

  setActiveTitle(titleId: number) {
    return this.http.patch(`${this.apiUrl}/set-title/${titleId}`, {}, { headers: this.getHeaders() });
  }

  getDailyMissions() {
    return this.http.get(`${this.apiUrl}/missions/daily`, { headers: this.getHeaders() });
  }

  claimMissionReward(userMissionId: number) {
    return this.http.post(`${this.apiUrl}/missions/claim/${userMissionId}`, {}, { headers: this.getHeaders() });
  }
}
