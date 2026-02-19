import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { SearchUserWidget } from '../../components/widgets/search-user-widget/search-user-widget';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, StatsRibbon, DailyMissionWidget, SearchUserWidget],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil {
  showAllAchievements = signal(false);
  activeAchievementTab = signal('membaca');

  user = {
    name: 'CHAINUR AR RASYID NASUTION',
    role: 'admin',
    joined: 'Juni 2025',
    avatar: '🐲'
  };

  stats = [
    { label: 'Kehadiran beruntun', value: 1, icon: '🔥' },
    { label: 'Total Poin', value: 0, icon: '⚡' },
    { label: 'Publikasi yang sudah dibaca', value: 0, icon: '📑' },
    { label: 'Berita Resmi Statistik yang sudah dibaca', value: 0, icon: '📁' }
  ];

  achievements = [
    {
      id: 1,
      title: 'Membaca 1 Dokumen Statistik',
      desc: 'Telah membaca 1 dokumen statistik',
      progress: 0,
      total: 1,
      status: 'locked',
      reward: 10
    },
    {
      id: 2,
      title: 'Membaca 3 Data',
      desc: 'Telah membaca 3 data',
      progress: 1,
      total: 3,
      status: 'in-progress',
      reward: 20
    },
    {
      id: 3,
      title: 'Membaca 1 Data',
      desc: 'Telah membaca 1 data',
      progress: 1,
      total: 1,
      status: 'completed',
      reward: 10
    },
    {
      id: 4,
      title: 'Membaca 5 Data',
      desc: 'Telah membaca 5 data',
      progress: 1,
      total: 5,
      status: 'locked',
      reward: 30
    }
  ];

  toggleAchievements() {
    this.showAllAchievements.set(!this.showAllAchievements());
  }

  setAchievementTab(tab: string) {
    this.activeAchievementTab.set(tab);
  }
}
