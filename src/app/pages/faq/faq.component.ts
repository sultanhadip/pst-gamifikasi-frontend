import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqItem, Category } from '../../core/models/models';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-bg-light font-sans">
      <!-- Header Section -->
      <div class="bg-bg-cream py-20 text-center px-6">
        <h1 class="text-3xl md:text-5xl font-black text-secondary mb-4">
          Bagaimana kami dapat membantu Anda?
        </h1>
        <p class="text-secondary/60 text-lg max-w-2xl mx-auto mb-10">
          Cari jawaban cepat seputar penggunaan platform, manajemen akun, dan kendala teknis lainnya.
        </p>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto relative">
          <div class="absolute inset-y-0 left-6 flex items-center pointer-events-none text-secondary/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Cari pertanyaan (misal: sertifikat, login)..." 
            class="w-full pl-14 pr-6 py-4 rounded-2xl shadow-lg border-0 focus:ring-2 focus:ring-primary/20 outline-none text-secondary"
          >
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="flex flex-col lg:flex-row gap-12">
          
          <!-- Sidebar Categories -->
          <div class="lg:w-1/4 space-y-2">
            <button 
              *ngFor="let cat of categories"
              (click)="activeCategory.set(cat.id)"
              [class]="activeCategory() === cat.id ? 'bg-orange-50 text-primary font-bold shadow-sm ring-1 ring-primary/10' : 'text-secondary/60 hover:bg-gray-50 hover:text-secondary'"
              class="w-full text-left px-6 py-4 rounded-xl flex items-center gap-3 transition-all duration-200"
            >
              <span [innerHTML]="cat.icon"></span>
              {{ cat.label }}
            </button>
          </div>

          <!-- FAQ Accordion -->
          <div class="lg:w-3/4 space-y-4">
            <div 
              *ngFor="let item of filteredFaqs(); let i = index"
              class="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              [class.shadow-md]="item.isOpen"
            >
              <button 
                (click)="toggleFaq(i)"
                class="w-full px-8 py-6 text-left flex justify-between items-center gap-4 bg-white"
              >
                <span class="font-bold text-secondary text-lg">{{ item.question }}</span>
                <div 
                  class="w-8 h-8 rounded-full bg-orange-50 text-primary flex items-center justify-center transition-transform duration-300 shrink-0"
                  [class.rotate-180]="item.isOpen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </button>
              
              <div 
                class="overflow-hidden transition-all duration-300 ease-in-out"
                [style.max-height]="item.isOpen ? '500px' : '0'"
                [style.opacity]="item.isOpen ? '1' : '0'"
              >
                <div class="px-8 pb-8 pt-0 text-secondary/70 leading-relaxed border-t border-gray-50 mt-2">
                  <br/>
                  {{ item.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 class="text-2xl font-bold text-secondary mb-4">Masih butuh bantuan?</h2>
        <p class="text-secondary/60 mb-10">Tim support kami siap membantu Anda menyelesaikan masalah yang tidak tercantum di atas.</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all text-left">
            <div class="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-primary shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-secondary">Email Support</h3>
              <p class="text-sm text-secondary/60">support@emarkop.bps.go.id</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all text-left">
             <div class="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-secondary">Call Center</h3>
              <p class="text-sm text-secondary/60">(021) 3841195</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FaqComponent {
  activeCategory = signal('all');

  categories = [
    { 
      id: 'all', 
      label: 'Semua Topik', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' 
    },
    { 
      id: 'general', 
      label: 'Umum', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>' 
    },
    { 
      id: 'courses', 
      label: 'Kursus & Pembelajaran', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' 
    },
    { 
      id: 'account', 
      label: 'Akun & Login', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' 
    },
    { 
      id: 'technical', 
      label: 'Teknis', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>' 
    },
    { 
      id: 'certificate', 
      label: 'Sertifikat', 
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' 
    }
  ];

  faqs: FaqItem[] = [
    {
      question: 'Apa itu E-Warkop?',
      answer: 'E-Warkop adalah platform pembelajaran online resmi dari Pusdiklat BPS RI yang dirancang untuk meningkatkan kompetensi pegawai melalui berbagai materi pelatihan digital yang mudah diakses.',
      category: 'general',
      isOpen: true
    },
    {
      question: 'Siapa yang bisa menggunakan E-Warkop?',
      answer: 'Platform ini dapat diakses oleh seluruh pegawai Badan Pusat Statistik (BPS) di seluruh Indonesia, serta mitra statistik dan masyarakat umum untuk kursus-kursus tertentu yang bersifat publik.',
      category: 'general',
      isOpen: false
    },
    {
      question: 'Apakah E-Warkop bisa diakses melalui mobile?',
      answer: 'Ya, E-Warkop didesain dengan tampilan responsif (mobile-friendly) sehingga dapat diakses dengan nyaman melalui smartphone maupun tablet, selain melalui komputer/laptop.',
      category: 'technical',
      isOpen: false
    },
    {
      question: 'Bagaimana cara mendapatkan sertifikat?',
      answer: 'Sertifikat akan diterbitkan secara otomatis setelah Anda menyelesaikan seluruh materi pembelajaran, kuis, dan evaluasi dalam suatu kursus dengan nilai minimal yang ditentukan.',
      category: 'certificate',
      isOpen: false
    },
    {
      question: 'Saya lupa password akun saya, apa solusinya?',
      answer: 'Anda dapat menggunakan fitur "Lupa Password" di halaman login. Masukkan email terdaftar Anda, dan instruksi reset password akan dikirimkan ke email tersebut.',
      category: 'account',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    // Only toggle visibility in the filtered view is tricky if we don't map back to original index. 
    // Simplified: Update the specific item in the main array.
    const itemToToggle = this.filteredFaqs()[index];
    itemToToggle.isOpen = !itemToToggle.isOpen;
  }

  filteredFaqs() {
    const active = this.activeCategory();
    if (active === 'all') {
      return this.faqs;
    }
    return this.faqs.filter(f => f.category === active);
  }
}
