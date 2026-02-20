import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { FilterWidget } from '../../components/widgets/filter-widget/filter-widget';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-brs',
  standalone: true,
  imports: [CommonModule, StatsRibbon, FilterWidget, DailyMissionWidget],
  templateUrl: './brs.html',
  styleUrl: './brs.css',
})
export class Brs implements OnInit {
  private activityService = inject(ActivityService);
  brsList = signal<any[]>([]);

  ngOnInit() {
    this.activityService.getBrs().subscribe((data: any) => {
      this.brsList.set(data);
    });
  }

  onRead(id: number) {
    this.activityService.readBrs(id).subscribe(() => {
      // Refresh or show success
    });
  }
}
