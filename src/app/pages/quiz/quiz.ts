import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningService } from '../../services/learning.service';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, StatsRibbon],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private learningService = inject(LearningService);

  lessonId = signal<number | null>(null);
  challenges = signal<any[]>([]);
  currentIndex = signal(0);
  selectedOptionId = signal<number | null>(null);
  isCorrect = signal<boolean | null>(null);
  completed = signal(false);
  results = signal<any>(null);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.lessonId.set(+id);
        this.loadChallenges(+id);
      }
    });
  }

  loadChallenges(id: number) {
    this.learningService.getChallenges(id).subscribe((data: any) => {
      this.challenges.set(data);
    });
  }

  selectOption(optionId: number) {
    if (this.isCorrect() !== null) return;
    this.selectedOptionId.set(optionId);
  }

  submitAnswer() {
    if (this.selectedOptionId() === null || this.isCorrect() !== null) return;

    const currentChallenge = this.challenges()[this.currentIndex()];
    const submission = {
      challengeId: currentChallenge.id,
      selectedOptionId: this.selectedOptionId()
    };

    this.learningService.submitChallenge(submission).subscribe((res: any) => {
      this.isCorrect.set(res.correct);
      this.results.set(res);
    });
  }

  nextChallenge() {
    if (this.currentIndex() < this.challenges().length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
      this.resetState();
    } else {
      this.completed.set(true);
    }
  }

  private resetState() {
    this.selectedOptionId.set(null);
    this.isCorrect.set(null);
    this.results.set(null);
  }

  finish() {
    this.router.navigate(['/learning']);
  }
}
