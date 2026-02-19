import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';

@Component({
  selector: 'app-publikasi-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatsRibbon, DailyMissionWidget],
  templateUrl: './publikasi-detail.html',
  styleUrl: './publikasi-detail.css',
})
export class PublikasiDetail implements OnInit {
  @Input() id?: string;

  // Mock data for detail view
  detail = {
    title: 'Laporan Bulanan Data Sosial Ekonomi Maret 2025',
    catalog: '9199017',
    publication: '03200.25009',
    issn: '2087-930X',
    releaseDate: '2025-04-25',
    size: '29.52 MB',
    abstract: 'Buku Laporan Bulanan Data Sosial Ekonomi ini diterbitkan setiap bulan oleh Badan Pusat Statistik (BPS). Data dan informasi yang dimuat tetap mengikuti perkembangan data terbaru yang dihimpun dan dirilis BPS, yang merupakan hasil pendataan langsung dan hasil kompilasi produk administrasi pemerintah yang dilakukan secara teratur (bulanan, triwulanan, tahunan) oleh jajaran BPS di seluruh Indonesia.'
  };

  ngOnInit() {
    // In a real app, fetch data by this.id
  }
}
