import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-publikasi-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatsRibbon, DailyMissionWidget],
  templateUrl: './publikasi-detail.html',
  styleUrl: './publikasi-detail.css',
})
export class PublikasiDetail implements OnInit {
  @Input() id?: string;
  private activityService = inject(ActivityService);

  detail = signal<any>(null);

  ngOnInit() {
    if (this.id) {
      this.activityService.getPublication(this.id).subscribe((data: any) => {
        this.detail.set(data);
      });
    }
  }

  onMarkRead() {
    if (this.id) {
      this.activityService.readPublication(Number(this.id)).subscribe(() => {
        // Updated state
      });
    }
  }
}
