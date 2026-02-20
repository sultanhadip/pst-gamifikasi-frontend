import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { FilterWidget } from '../../components/widgets/filter-widget/filter-widget';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';

@Component({
  selector: 'app-brs',
  standalone: true,
  imports: [CommonModule, StatsRibbon, FilterWidget, DailyMissionWidget],
  templateUrl: './brs.html',
  styleUrl: './brs.css',
})
export class Brs {
  brsList = [
    {
      id: 1,
      title: 'Perkembangan Indeks Harga konsumen Desember 2024',
      date: '2025-01-02',
      description: 'Perkembangan Indeks Harga Konsumen (IHK) Desember 2024 mengalami inflasi sebesar 0.5%...',
      image: 'assets/brs1.jpg'
    },
    {
      id: 2,
      title: 'Perkembangan Ekspor dan Impor Indonesia November 2024',
      date: '2024-12-15',
      description: 'Nilai ekspor Indonesia November 2024 mencapai US$22.00 miliar...',
      image: 'assets/brs2.jpg'
    },
    {
      id: 3,
      title: 'Pertumbuhan Ekonomi Indonesia Triwulan III-2024',
      date: '2024-11-05',
      description: 'Ekonomi Indonesia triwulan III-2024 terhadap triwulan III-2023 tumbuh sebesar 5.05 persen (y-on-y).',
      image: 'assets/brs3.jpg'
    }
  ];
}
