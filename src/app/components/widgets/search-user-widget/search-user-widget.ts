import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-search-user-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-user-widget.html',
  styleUrl: './search-user-widget.css',
})
export class SearchUserWidget {
  private userService = inject(UserService);
  
  searchQuery = signal('');
  searchResults = signal<any[]>([]);
  isLoading = signal(false);

  onSearch() {
    if (this.searchQuery().trim().length < 3) {
      this.searchResults.set([]);
      return;
    }

    this.isLoading.set(true);
    this.userService.searchUsers(this.searchQuery()).subscribe({
      next: (users: any) => {
        this.searchResults.set(users);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
}
