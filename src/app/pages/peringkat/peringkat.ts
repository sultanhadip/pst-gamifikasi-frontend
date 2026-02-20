import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { KegiatanBpsWidget } from '../../components/widgets/kegiatan-bps-widget/kegiatan-bps-widget';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-peringkat',
  standalone: true,
  imports: [CommonModule, StatsRibbon, DailyMissionWidget, KegiatanBpsWidget],
  templateUrl: './peringkat.html',
  styleUrl: './peringkat.css',
})
export class Peringkat implements OnInit {
  private userService = inject(UserService);
  activeTab = signal<'points' | 'publications' | 'press' | 'quizzes'>('points');
  leaders = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.loadLeaderboard();
    });
  }

  ngOnInit() {
    // Initial load handled by effect
  }

  loadLeaderboard() {
    this.userService.getLeaderboard(this.activeTab()).subscribe((data: any) => {
      this.leaders.set(data);
    });
  }

  setTab(tab: 'points' | 'publications' | 'press' | 'quizzes') {
    this.activeTab.set(tab);
  }
}
