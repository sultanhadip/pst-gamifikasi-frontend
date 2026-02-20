import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-stats-ribbon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-ribbon.html',
  styleUrl: './stats-ribbon.css',
})
export class StatsRibbon implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  userProgress = signal<any>(null);
  userProfile = signal<any>(null);

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getMyProfile().subscribe(profile => this.userProfile.set(profile));
      this.userService.getMyProgress().subscribe(progress => this.userProgress.set(progress));
    }
  }
}
