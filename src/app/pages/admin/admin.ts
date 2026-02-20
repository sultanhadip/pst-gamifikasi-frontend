import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { LearningService } from '../../services/learning.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private adminService = inject(AdminService);
  private learningService = inject(LearningService);
  private fb = inject(FormBuilder);

  activeTab = signal<'content' | 'users' | 'user-detail'>('content');
  
  // Drill-down State
  contentView = signal<'courses' | 'units' | 'lessons'>('courses');
  selectedCourse = signal<any>(null);
  selectedUnit = signal<any>(null);

  courses = signal<any[]>([]);
  units = signal<any[]>([]);
  lessons = signal<any[]>([]);
  
  allUsers = signal<any[]>([]);
  selectedUser = signal<any>(null);

  // Form State
  showModal = signal(false);
  modalMode = signal<'add' | 'edit'>('add');
  modalType = signal<'course' | 'unit' | 'lesson'>('course');
  selectedId = signal<number | null>(null);

  adminForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    imageSrc: [''],
    unlockCost: [0],
    content: [''],
    orderIndex: [0]
  });

  ngOnInit() {
    this.loadCourses();
    this.loadUsers();
  }

  loadCourses() {
    this.learningService.getCourses().subscribe((data: any) => {
      this.courses.set(data);
    });
  }

  loadUnits(courseId: number) {
    this.learningService.getUnits(courseId).subscribe((data: any) => {
      this.units.set(data);
    });
  }

  loadLessons(unitId: number) {
    this.learningService.getLessons(unitId).subscribe((data: any) => {
      this.lessons.set(data);
    });
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((data: any) => {
      this.allUsers.set(data);
    });
  }

  // Navigation
  setActiveTab(tab: 'content' | 'users' | 'user-detail') {
    this.activeTab.set(tab);
    if (tab === 'content') this.contentView.set('courses');
  }

  viewUnits(course: any) {
    this.selectedCourse.set(course);
    this.contentView.set('units');
    this.loadUnits(course.id);
  }

  viewLessons(unit: any) {
    this.selectedUnit.set(unit);
    this.contentView.set('lessons');
    this.loadLessons(unit.id);
  }

  backToCourses() {
    this.contentView.set('courses');
    this.selectedCourse.set(null);
  }

  backToUnits() {
    this.contentView.set('units');
    this.selectedUnit.set(null);
  }

  // CRUD Actions
  openAddModal(type: 'course' | 'unit' | 'lesson') {
    this.modalMode.set('add');
    this.modalType.set(type);
    this.adminForm.reset({ orderIndex: 0, unlockCost: 0 });
    this.showModal.set(true);
  }

  openEditModal(type: 'course' | 'unit' | 'lesson', item: any) {
    this.modalMode.set('edit');
    this.modalType.set(type);
    this.selectedId.set(item.id);
    this.adminForm.patchValue(item);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  onSubmit() {
    if (this.adminForm.invalid) return;

    const data = this.adminForm.value;
    const type = this.modalType();
    const mode = this.modalMode();

    if (type === 'course') {
      if (mode === 'add') {
        this.adminService.createCourse(data).subscribe(() => this.onSuccess());
      } else {
        this.adminService.updateCourse(this.selectedId()!, data).subscribe(() => this.onSuccess());
      }
    } else if (type === 'unit') {
      const unitData = { ...data, course: { id: this.selectedCourse().id } };
      if (mode === 'add') {
        this.adminService.createUnit(unitData).subscribe(() => this.onSuccess());
      } else {
        this.adminService.updateUnit(this.selectedId()!, unitData).subscribe(() => this.onSuccess());
      }
    } else if (type === 'lesson') {
      const lessonData = { ...data, unit: { id: this.selectedUnit().id } };
      if (mode === 'add') {
        this.adminService.createLesson(lessonData).subscribe(() => this.onSuccess());
      } else {
        this.adminService.updateLesson(this.selectedId()!, lessonData).subscribe(() => this.onSuccess());
      }
    }
  }

  onSuccess() {
    this.closeModal();
    const type = this.modalType();
    if (type === 'course') this.loadCourses();
    else if (type === 'unit') this.loadUnits(this.selectedCourse().id);
    else if (type === 'lesson') this.loadLessons(this.selectedUnit().id);
  }

  onDelete(type: 'course' | 'unit' | 'lesson', id: number) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    if (type === 'course') {
      this.adminService.deleteCourse(id).subscribe(() => this.loadCourses());
    } else if (type === 'unit') {
      this.adminService.deleteUnit(id).subscribe(() => this.loadUnits(this.selectedCourse().id));
    } else if (type === 'lesson') {
      this.adminService.deleteLesson(id).subscribe(() => this.loadLessons(this.selectedUnit().id));
    }
  }

  // Existing user methods
  viewUserDetail(user: any) {
    this.selectedUser.set(user);
    this.setActiveTab('user-detail');
  }

  onBanUser(id: string) {
    this.adminService.banUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  onUnbanUser(id: string) {
    this.adminService.unbanUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
