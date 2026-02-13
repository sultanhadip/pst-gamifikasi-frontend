import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      [class.bg-white_90]="isScrolled()"
      [class.backdrop-blur-md]="isScrolled()"
      [class.shadow-md]="isScrolled()"
      [class.py-4]="!isScrolled()"
      [class.py-3]="isScrolled()"
      [class.bg-transparent]="!isScrolled()"
      [class.border-transparent]="!isScrolled()"
      [class.border-gray-100]="isScrolled()"
    >
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2 group cursor-pointer">
          <div class="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14H4L8 6Z"/><path d="M12 2v2"/><path d="m9 22 3-8 3 8"/><path d="M8 22h8"/></svg>
          </div>
          <div class="leading-tight">
            <h1 class="font-bold text-secondary text-sm tracking-tight">E-LEARNING</h1>
            <h2 class="text-primary font-bold text-xs tracking-widest group-hover:text-primary-dark transition-colors">WARKOP BPS</h2>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-sm">
          <a 
            routerLink="/" 
            routerLinkActive="bg-white text-primary shadow-sm ring-1 ring-black/5" 
            [routerLinkActiveOptions]="{exact: true}" 
            class="px-5 py-2 rounded-full text-sm font-bold text-secondary/70 hover:text-primary transition-all duration-300 cursor-pointer"
          >
            Beranda
          </a>
          <a 
            routerLink="/courses" 
            routerLinkActive="bg-white text-primary shadow-sm ring-1 ring-black/5"
            class="px-5 py-2 rounded-full text-sm font-bold text-secondary/70 hover:text-primary transition-all duration-300 cursor-pointer"
          >
            Kursus
          </a>
          <a 
            routerLink="/faq" 
            routerLinkActive="bg-white text-primary shadow-sm ring-1 ring-black/5"
            class="px-5 py-2 rounded-full text-sm font-bold text-secondary/70 hover:text-primary transition-all duration-300 cursor-pointer"
          >
            FAQ
          </a>
          <a 
            href="#" 
            class="px-5 py-2 rounded-full text-sm font-bold text-secondary/70 hover:text-primary transition-all duration-300 cursor-pointer"
          >
            Pusat Pengetahuan
          </a>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-3">
          <button class="p-2.5 rounded-full hover:bg-gray-100/80 text-secondary/70 hover:text-primary transition-all duration-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          </button>
          <button class="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary-dark transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2 cursor-pointer">
            Masuk
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .bg-white_90 { background-color: rgba(255, 255, 255, 0.9); }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }
}
