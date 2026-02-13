import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-secondary pt-20 pb-10 text-white relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div class="col-span-1 md:col-span-1 space-y-6">
            <div class="flex items-center gap-2">
              <div class="bg-primary p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14H4L8 6Z"/><path d="M12 2v2"/><path d="m9 22 3-8 3 8"/><path d="M8 22h8"/></svg>
              </div>
              <h1 class="font-black text-xl tracking-tight">E-Warkop</h1>
            </div>
            <p class="text-white/60 leading-relaxed text-sm">
              Platform E-Learning resmi Pusdiklat BPS RI. Mengakselerasi kompetensi SDM melalui inovasi pembelajaran digital terintegrasi.
            </p>
            <div class="flex gap-4">
              <a *ngFor="let social of ['facebook', 'instagram', 'twitter', 'youtube']" href="#" class="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-primary/50 group">
                <span class="text-xs uppercase font-bold group-hover:scale-110 transition-transform">{{ social[0] }}</span>
              </a>
            </div>
          </div>

          <div class="md:col-span-2 grid grid-cols-2 gap-8">
            <div class="space-y-6">
              <h4 class="font-bold text-lg text-white">Jelajahi</h4>
              <ul class="space-y-3 text-white/60 text-sm">
                <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Dashboard</a></li>
                <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Kursus Saya</a></li>
                <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span> FAQ</a></li>
                <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Katalog Kursus</a></li>
                <li><a href="#" class="hover:text-primary transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Knowledge Center</a></li>
              </ul>
            </div>
            <div class="space-y-6">
              <h4 class="font-bold text-lg text-white">Hubungi Kami</h4>
              <ul class="space-y-4 text-white/60 text-sm">
                <li class="flex gap-4 items-start group">
                  <div class="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <span class="group-hover:text-white transition-colors">Jl. Raya Jagakarsa No.70, Jakarta Selatan 12620</span>
                </li>
                <li class="flex gap-4 items-center group">
                  <div class="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <span class="group-hover:text-white transition-colors">(021) 7873781</span>
                </li>
                <li class="flex gap-4 items-center group">
                  <div class="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <span class="group-hover:text-white transition-colors">pusdiklat@bps.go.id</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="font-bold text-lg text-white">Download App</h4>
            <div class="flex flex-col gap-4">
               <button class="bg-white/5 p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer border border-white/5 group hover:scale-105 active:scale-95 duration-300 w-full">
                  <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span class="text-lg font-bold">G</span>
                  </div>
                  <div class="text-left">
                    <p class="text-[10px] text-white/40 uppercase tracking-widest">Get it on</p>
                    <p class="font-bold text-white">Google Play</p>
                  </div>
               </button>
               <button class="bg-white/5 p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer border border-white/5 group hover:scale-105 active:scale-95 duration-300 w-full">
                  <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <span class="text-lg font-bold">A</span>
                  </div>
                  <div class="text-left">
                    <p class="text-[10px] text-white/40 uppercase tracking-widest">Download on</p>
                    <p class="font-bold text-white">App Store</p>
                  </div>
               </button>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <p>© 2026 Pusdiklat BPS RI. All rights reserved.</p>
          <div class="flex gap-8">
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" class="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
