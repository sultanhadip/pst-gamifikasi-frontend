import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { FilterWidget } from '../../components/widgets/filter-widget/filter-widget';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-publikasi',
  standalone: true,
  imports: [CommonModule, RouterLink, StatsRibbon, FilterWidget, DailyMissionWidget],
  templateUrl: './publikasi.html',
  styleUrl: './publikasi.css',
})
export class Publikasi implements OnInit {
  private activityService = inject(ActivityService);
  publications = signal<any[]>([]);

  ngOnInit() {
    this.activityService.getPublications().subscribe((data: any) => {
      this.publications.set(data);
    });
  }
}
