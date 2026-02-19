import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { KegiatanBpsWidget } from '../../components/widgets/kegiatan-bps-widget/kegiatan-bps-widget';

@Component({
  selector: 'app-peringkat',
  standalone: true,
  imports: [CommonModule, StatsRibbon, DailyMissionWidget, KegiatanBpsWidget],
  templateUrl: './peringkat.html',
  styleUrl: './peringkat.css',
})
export class Peringkat {
  activeTab = signal<'xp' | 'publikasi' | 'brs' | 'kuis'>('xp');

  leaders = [
    { rank: 1, name: 'Adi Nugroho', xp: '1073 XP', avatar: '🐱' },
    { rank: 2, name: 'Siti Aminah', xp: '1032 XP', avatar: '🦊' },
    { rank: 3, name: 'Budi Santoso', xp: '955 XP', avatar: '🐯' },
    { rank: 4, name: 'Dewi Lestari', xp: '755 XP', avatar: '🐰' },
    { rank: 5, name: 'Eko Prasetyo', xp: '340 XP', avatar: '🐸' },
    { rank: 6, name: 'Fitri Handayani', xp: '270 XP', avatar: '🐼' },
    { rank: 7, name: 'Guruh Soekarno', xp: '220 XP', avatar: '🦁' },
  ];

  setTab(tab: 'xp' | 'publikasi' | 'brs' | 'kuis') {
    this.activeTab.set(tab);
  }
}
