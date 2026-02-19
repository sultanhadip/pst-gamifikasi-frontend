import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KegiatanBpsWidget } from '../../components/widgets/kegiatan-bps-widget/kegiatan-bps-widget';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, KegiatanBpsWidget, StatsRibbon, DailyMissionWidget],
  templateUrl: './learning.html',
  styleUrl: './learning.css',
})
export class Learning {
}
