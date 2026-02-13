import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, Stat, Testimonial } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-8 animate-in fade-in slide-in-from-left duration-700">
        <div class="space-y-4">
          <h1 class="text-4xl md:text-6xl font-black text-secondary leading-tight">
            Selamat Datang di <br/>
            <span class="text-primary underline decoration-gold decoration-4 underline-offset-8">E-Warkop</span> BPS
          </h1>
          <p class="text-secondary/60 text-lg max-w-md">
            Platform pembelajaran online yang menyajikan berbagai materi pelatihan, pengetahuan, dan webinar yang dapat diakses oleh seluruh pegawai Badan Pusat Statistik dan masyarakat umum.
          </p>
        </div>

        <div class="relative group max-w-lg">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary/40 group-focus-within:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Cari topik pembelajaran..." 
            class="w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-gray-100"
          >
          <button class="absolute right-2 inset-y-2 bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>

        <div class="flex flex-wrap gap-2 items-center text-sm">
          <span class="text-secondary/40 mr-2">Populer:</span>
          <button *ngFor="let tag of popularTags" class="px-4 py-1.5 bg-white rounded-full border border-gray-100 hover:border-primary hover:text-primary transition-all shadow-sm">
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="relative animate-in fade-in slide-in-from-right duration-700">
        <div class="absolute -z-10 bg-primary/10 rounded-full w-full aspect-square blur-3xl scale-110 top-0"></div>
        <div class="relative">
          <!-- Floating cards -->
          <div class="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-xl z-20 animate-bounce transition-all duration-1000">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EE641E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div class="absolute top-1/4 -right-4 bg-white p-3 rounded-2xl shadow-xl z-20 animate-pulse transition-all duration-1000">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
          </div>
          <div class="absolute -bottom-4 left-1/4 bg-white p-3 rounded-2xl shadow-xl z-20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EE641E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
          </div>
          
          <img 
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=700" 
            alt="Student" 
            class="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover grayscale-0 hover:grayscale-[0.2] transition-all duration-500"
          >
        </div>
      </div>
    </main>

    <!-- Stats Section -->
    <section class="bg-primary py-12">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div *ngFor="let stat of stats" class="flex flex-col items-center text-center text-white border-r last:border-r-0 border-white/20">
          <span class="text-4xl font-black mb-2">{{ stat.value }}</span>
          <span class="text-white/80 font-medium uppercase tracking-wider text-sm">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Courses Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-4xl font-black text-secondary">Kursus Terbaru</h2>
            <p class="text-secondary/60 max-w-2xl">
              Temukan kursus-kursus terbaru yang dirancang khusus untuk meningkatkan kompetensi pegawai BPS. Materi pembelajaran yang up-to-date dan relevan dengan kebutuhan organisasi saat ini.
            </p>
          </div>
          <div class="flex gap-4">
            <button class="p-3 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="p-3 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let course of courses" class="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-gray-100/50">
            <div class="relative h-48 overflow-hidden">
              <img [src]="course.image" [alt]="course.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-secondary shadow-sm">
                  {{ course.badge }}
                </span>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <h3 class="font-bold text-secondary leading-tight group-hover:text-primary transition-colors">
                {{ course.title }}
              </h3>
              <div class="flex items-center gap-2">
                <div class="flex text-accent">
                  <ng-container *ngFor="let star of [1,2,3,4,5]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="star" [class.text-gray-200]="star > course.rating"><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/></svg>
                  </ng-container>
                </div>
                <span class="text-xs text-secondary/40">({{ course.rating }})</span>
              </div>
              <div class="flex items-center gap-2 pt-2 border-t border-gray-50">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <span class="text-xs text-secondary/60 truncate">{{ course.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-bg-cream">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="space-y-4 mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-secondary underline-highlight">Kata Mereka</h2>
          <p class="text-secondary/60">Pengalaman rekan-rekan yang telah bergabung</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div *ngFor="let item of testimonials" class="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all text-left space-y-6 relative group overflow-hidden">
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="flex text-accent">
               <ng-container *ngFor="let star of [1,2,3,4,5]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/></svg>
               </ng-container>
            </div>

            <p class="text-secondary/70 italic relative z-10">
              "{{ item.text }}"
            </p>

            <div class="flex items-center gap-4 relative z-10">
              <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-secondary shrink-0">
                {{ item.initial }}
              </div>
              <div>
                <h4 class="font-bold text-secondary">{{ item.name }}</h4>
                <p class="text-xs text-secondary/40">{{ item.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden group">
        <div class="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/5 transition-all duration-700"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2 space-y-8 text-center md:text-left">
            <h2 class="text-4xl md:text-5xl font-black text-white leading-tight">
              Siap Mengembangkan Kompetensi Anda?
            </h2>
            <p class="text-white/80 text-lg">
              Bergabunglah dengan ribuan pembelajar lainnya dan mulai perjalanan pengembangan kompetensi Anda bersama E-Warkop hari ini.
            </p>
            <button class="bg-white text-primary px-8 py-4 rounded-2xl font-black hover:bg-bg-cream transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto md:mx-0 shadow-2xl">
              Mulai Belajar Sekarang
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
          <div class="md:w-1/2 relative hidden md:block">
             <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Team" class="rounded-3xl shadow-2xl border-4 border-white/20">
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  stats: Stat[] = [
    { label: 'Peserta Aktif', value: '15k+' },
    { label: 'Kursus Tersedia', value: '500+' },
    { label: 'Sertifikat Terbit', value: '25k+' }
  ];

  popularTags = ['Populer', 'Statistik', 'Data Science', 'Leadership', 'Pemerintahan'];

  courses: Course[] = [
    {
      title: 'Pranata Komputer Terampil Angkatan V',
      type: 'Diklat Teknis',
      rating: 4,
      ratingCount: 4,
      author: 'Prof. Marcelo Mosciski',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      badge: 'Terampil',
      students: 20
    },
    {
      title: 'Uji Coba LMS-NG I',
      type: 'Diklat Teknis',
      rating: 4,
      ratingCount: 4,
      author: 'Prof. Marcelo Mosciski',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?w=400&h=250&fit=crop',
      badge: 'Diklat Teknis',
      students: 40
    },
    {
      title: 'Machine Learning Essentials II',
      type: 'Pelatihan Dasar',
      rating: 0,
      ratingCount: 0,
      author: 'Akun Skripsi Apili versil, Prof. ...',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      badge: 'Pelatihan Dasar',
      students: 0
    },
    {
      title: 'Pelatihan Sensus Ekonomi 2026 V',
      type: 'Sensus',
      rating: 0,
      ratingCount: 0,
      author: 'Unknown',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      badge: 'Sensus',
      students: 0
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Budi Santoso',
      role: 'L&D Manager, PT Telkom Indonesia',
      text: 'Platform E-Warkop sangat membantu dalam meningkatkan kompetensi karyawan kami. Interface yang intuitif membuat proses pembelajaran jadi lebih efektif.',
      initial: 'B'
    },
    {
      name: 'Siti Nurhaliza',
      role: 'HR Director, Bank Mandiri',
      text: 'Materi yang disajikan sangat relevan dengan kebutuhan industri saat ini. Fitur AI learning path sangat membantu saya fokus pada skill yang dibutuhkan.',
      initial: 'S'
    },
    {
      name: 'Ahmad Wijaya',
      role: 'Training Manager, Pertamina',
      text: 'Sangat merekomendasikan platform ini untuk siapa saja yang ingin upgrade skill. Kemudahan akses dan kualitas kontennya luar biasa.',
      initial: 'A'
    }
  ];
}
