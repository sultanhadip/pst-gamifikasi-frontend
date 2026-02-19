import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { FilterWidget } from '../../components/widgets/filter-widget/filter-widget';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';

@Component({
  selector: 'app-publikasi',
  standalone: true,
  imports: [CommonModule, RouterLink, StatsRibbon, FilterWidget, DailyMissionWidget],
  templateUrl: './publikasi.html',
  styleUrl: './publikasi.css',
})
export class Publikasi {
  publications = [
    {
      id: 1,
      title: 'Statistik Pendapatan Februari 2025',
      date: '2025-06-11',
      description: 'Publikasi Statistik Pendapatan Februari 2025 Perhatian pemerintah terhadap pekerja berstatus bukan buruh (pekerja berusaha sendiri/pekerja bebas) tidak seperti perhatian pemerintah terhadap pekerja berstatus buruh yang mempunyai perlindungan hukum.',
      image: 'assets/cover1.jpg' // Placeholder
    },
    {
      id: 2,
      title: 'Keadaan Pekerja di Indonesia Februari 2025',
      date: '2025-06-11',
      description: 'Publikasi ini merupakan pelengkap publikasi Keadaan Angkatan Kerja di Indonesia Februari 2025. Publikasi ini menggunakan data dari Survei Angkatan Kerja Nasional (Sakernas) Februari 2025.',
      image: 'assets/cover2.jpg' // Placeholder
    },
    {
      id: 3,
      title: 'Produk Domestik Regional Bruto',
      date: '2025-06-10',
      description: 'Publikasi Produk Domestik Regional Bruto memberikan gambaran mengenai performa ekonomi regional dengan detail sektor.',
      image: 'assets/cover3.jpg' // Placeholder
    }
  ];
}
