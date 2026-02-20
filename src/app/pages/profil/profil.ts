import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { SearchUserWidget } from '../../components/widgets/search-user-widget/search-user-widget';
import { UserService } from '../../services/user.service';
import { GamificationService } from '../../services/gamification.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, StatsRibbon, DailyMissionWidget, SearchUserWidget],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil implements OnInit {
  private userService = inject(UserService);
  private gamificationService = inject(GamificationService);

  showAllAchievements = signal(false);
  activeAchievementTab = signal('all');
  showTitlesModal = signal(false);

  userProfile = signal<any>(null);
  userProgress = signal<any>(null);
  achievements = signal<any[]>([]);
  titles = signal<any[]>([]);

  ngOnInit() {
    this.userService.getMyProfile().subscribe(data => this.userProfile.set(data));
    this.userService.getMyProgress().subscribe(data => this.userProgress.set(data));
    this.gamificationService.getAchievements().subscribe((data: any) => {
      this.achievements.set(data);
    });
    this.gamificationService.getMyTitles().subscribe((data: any) => {
      this.titles.set(data);
    });
  }

  toggleAchievements() {
    this.showAllAchievements.set(!this.showAllAchievements());
  }

  setAchievementTab(tab: string) {
    this.activeAchievementTab.set(tab);
  }

  toggleTitlesModal() {
    this.showTitlesModal.set(!this.showTitlesModal());
  }

  onSetTitle(titleId: number) {
    this.gamificationService.setActiveTitle(titleId).subscribe(() => {
      this.toggleTitlesModal();
      // Refresh titles to see the active one
      this.gamificationService.getMyTitles().subscribe((data: any) => {
        this.titles.set(data);
      });
    });
  }
}
