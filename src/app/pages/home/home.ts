import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);

  startAdventure() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/learning']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
