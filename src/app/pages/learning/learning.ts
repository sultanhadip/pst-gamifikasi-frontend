import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KegiatanBpsWidget } from '../../components/widgets/kegiatan-bps-widget/kegiatan-bps-widget';
import { StatsRibbon } from '../../components/widgets/stats-ribbon/stats-ribbon';
import { DailyMissionWidget } from '../../components/widgets/daily-mission-widget/daily-mission-widget';
import { LearningService } from '../../services/learning.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CommonModule, RouterLink, KegiatanBpsWidget, StatsRibbon, DailyMissionWidget],
  templateUrl: './learning.html',
  styleUrl: './learning.css',
})
export class Learning implements OnInit {
  private learningService = inject(LearningService);

  private userService = inject(UserService);

  courses = signal<any[]>([]);
  activeCourse = signal<any>(null);
  units = signal<any[]>([]);
  activeUnit = signal<any>(null);
  lessons = signal<any[]>([]);

  ngOnInit() {
    this.learningService.getCourses().subscribe((data: any) => {
      this.courses.set(data);
      // We don't auto-select the first course, we should probably fetch the user's active course
      this.userService.getMyProfile().subscribe((profile: any) => {
        if (profile.activeCourseId) {
          const active = data.find((c: any) => c.id === profile.activeCourseId);
          if (active) this.selectCourse(active);
          else if (data.length > 0) this.selectCourse(data[0]);
        } else if (data.length > 0) {
          this.selectCourse(data[0]);
        }
      });
    });
  }

  selectCourse(course: any) {
    this.activeCourse.set(course);
    this.userService.setActiveCourse(course.id).subscribe();
    this.learningService.getUnits(course.id).subscribe((units: any) => {
      this.units.set(units);
      if (units.length > 0) {
        this.selectUnit(units[0]);
      }
    });
  }

  selectUnit(unit: any) {
    if (unit.isLocked) {
      this.onUnlockUnit(unit.id);
      return;
    }
    this.activeUnit.set(unit);
    this.learningService.getLessons(unit.id).subscribe((lessons: any) => {
      this.lessons.set(lessons);
    });
  }

  onUnlockUnit(unitId: number) {
    this.learningService.unlockUnit(unitId).subscribe(() => {
      this.selectCourse(this.activeCourse());
    });
  }
}
