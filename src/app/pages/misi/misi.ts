import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { KegiatanBpsWidget } from '../../components/widgets/kegiatan-bps-widget/kegiatan-bps-widget';
import { GamificationService } from '../../services/gamification.service';

@Component({
  selector: 'app-misi',
  standalone: true,
  imports: [CommonModule, StatsRibbon, KegiatanBpsWidget],
  templateUrl: './misi.html',
  styleUrl: './misi.css',
})
export class Misi implements OnInit {
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
      // Refresh
      this.ngOnInit();
    });
  }
}
