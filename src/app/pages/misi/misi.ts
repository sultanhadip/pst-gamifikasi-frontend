import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { KegiatanBpsWidget } from '../../components/widgets/kegiatan-bps-widget/kegiatan-bps-widget';

@Component({
  selector: 'app-misi',
  standalone: true,
  imports: [CommonModule, StatsRibbon, KegiatanBpsWidget],
  templateUrl: './misi.html',
  styleUrl: './misi.css',
})
export class Misi {
  categories = [
    {
      title: 'Kumpulkan Poin',
      missions: [
        { title: 'Dapatkan 20 Poin', progress: 30, total: 20, unit: 'Poin', completed: true },
        { title: 'Dapatkan 50 Poin', progress: 30, total: 50, unit: 'Poin', completed: false },
        { title: 'Dapatkan 100 Poin', progress: 30, total: 100, unit: 'Poin', completed: false },
      ]
    },
    {
      title: 'Baca Publikasi',
      missions: [
        { title: 'Baca 1 Publikasi', progress: 2, total: 1, unit: 'Publikasi', completed: true },
        { title: 'Baca 3 Publikasi', progress: 2, total: 3, unit: 'Publikasi', completed: false },
      ]
    }
  ];
}
