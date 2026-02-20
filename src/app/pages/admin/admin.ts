import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  activeTab = signal<'content' | 'users' | 'user-detail'>('content');

  setActiveTab(tab: 'content' | 'users' | 'user-detail') {
    this.activeTab.set(tab);
  }

  // Mock Data
  courses = [
    { id: 1, title: 'Dasar-Dasar Statistik', image: '📊' },
    { id: 2, title: 'Big Data', image: '🌐' }
  ];

  units = [
    { id: 1, title: 'Materi 1', course: 'Dasar-Dasar Statistik (ID: 1)', order: 1, cost: 0, description: 'Konsep Statistika Dasar' },
    { id: 2, title: 'Materi 2', course: 'Dasar-Dasar Statistik (ID: 1)', order: 2, cost: 5, description: 'Pengumpulan Data' },
    { id: 3, title: 'Materi 3', course: 'Dasar-Dasar Statistik (ID: 1)', order: 3, cost: 10, description: 'Konsep Statistika Dasar Lanjutan' },
    { id: 4, title: 'Materi 4', course: 'Dasar-Dasar Statistik (ID: 1)', order: 4, cost: 15, description: 'Pengumpulan Data Lanjutan' }
  ];

  admins = [
    { name: 'CHAINUR AR RASYID NASUTION', email: '222111966@stis.ac.id', username: 'admin', role: 'admin', status: 'Active', joined: '25 Jun 2025', avatar: '👨‍💼' }
  ];

  regularUsers = Array(7).fill({
    name: 'CHAINUR AR RASYID NASUTION',
    email: '222111966@stis.ac.id',
    username: 'admin',
    role: 'user',
    status: 'Active',
    avatar: '👤'
  });

  userDetail = {
    name: 'CHAINUR AR RASYID NASUTION',
    role: 'admin',
    id: 'USR-8273645192837465',
    username: 'admin',
    email: '222111966@stis.ac.id',
    emailVerified: true,
    level: 1,
    levelLabel: 'Beginner I',
    activeCourse: 'Dasar-Dasar Statistik',
    streaks: 1,
    lastStreak: '24 Jun 2025, 07.00',
    diamonds: 0,
    progress: {
      points: 0,
      publications: 0,
      press: 0,
      quizzes: 0
    },
    joined: '25 Jun 2025, 01.50',
    linkedAccounts: [
      { provider: 'google', accountId: '10982736455...', linkedAt: '25/06/25, 01.50' }
    ]
  };
}
