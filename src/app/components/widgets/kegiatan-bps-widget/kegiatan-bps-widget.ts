import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-kegiatan-bps-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kegiatan-bps-widget.html',
  styleUrl: './kegiatan-bps-widget.css',
})
export class KegiatanBpsWidget implements OnInit {
  private activityService = inject(ActivityService);

  activities = signal<any[]>([]);

  ngOnInit() {
    this.activityService.getBrs().subscribe((data: any) => {
      // For widget we only show latest few
      this.activities.set(data.slice(0, 3).map((item: any) => ({
        ...item,
        type: 'BRS'
      })));
    });
  }
}
