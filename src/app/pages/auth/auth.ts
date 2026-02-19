import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  private router = inject(Router);
  activeTab = signal<'signin' | 'signup'>('signin');

  ngOnInit() {
    if (this.router.url.includes('register')) {
      this.activeTab.set('signup');
    }
  }

  setActiveTab(tab: 'signin' | 'signup') {
    this.activeTab.set(tab);
    // Optional: update URL
  }
}
