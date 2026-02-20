import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamificationService } from '../../../services/gamification.service';

@Component({
  selector: 'app-daily-mission-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-mission-widget.html',
  styleUrl: './daily-mission-widget.css',
})
export class DailyMissionWidget implements OnInit {
  private gamificationService = inject(GamificationService);

  missions = signal<any[]>([]);

  ngOnInit() {
    this.gamificationService.getDailyMissions().subscribe((data: any) => {
      this.missions.set(data);
    });
  }

  claimReward(userMission: any) {
    if (!userMission.isCompleted || userMission.isClaimed) return;

    this.gamificationService.claimMissionReward(userMission.id).subscribe(() => {
      userMission.isClaimed = true;
      // Refresh mission list or update local state
    });
  }
}
