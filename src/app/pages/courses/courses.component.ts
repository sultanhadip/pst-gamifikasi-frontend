import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Course, CreateCourseRequest } from '../../core/models/models';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-bg-light py-12">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header Section -->
        <div class="flex justify-between items-end mb-12">
          <div class="space-y-4">
            <h1 class="text-4xl font-black text-secondary">Semua Kursus</h1>
            <p class="text-secondary/60 text-lg">Jelajahi koleksi lengkap kursus profesional kami</p>
          </div>
          <button (click)="openAddModal()" class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            Tambah Kursus
          </button>
        </div>

        <!-- Filters Section -->
        <div class="flex flex-col lg:flex-row gap-4 mb-12">
          <!-- Search -->
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-secondary/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search courses..." 
              class="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            >
          </div>

          <!-- Dropdowns -->
          <div class="flex gap-4">
            <div class="relative min-w-[180px]">
              <select class="w-full appearance-none px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-secondary cursor-pointer">
                <option>All Categories</option>
                <option>Diklat Teknis</option>
                <option>Sensus</option>
                <option>Pelatihan Dasar</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-secondary/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div class="relative min-w-[150px]">
              <select class="w-full appearance-none px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-secondary cursor-pointer">
                <option>Urutkan</option>
                <option>Terbaru</option>
                <option>Terpopuler</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-secondary/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <!-- View Toggles -->
          <div class="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm h-[50px] items-center">
             <button class="p-2 rounded-lg bg-gray-100 text-secondary hover:bg-gray-200 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
             </button>
             <button class="p-2 rounded-lg text-secondary/40 hover:bg-gray-50 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
             </button>
          </div>
        </div>

        <!-- Course Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let course of courses" class="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full relative">
            
            <!-- Hover Overlay Action -->
            <div class="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
               <button class="bg-white text-secondary px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                 Lihat Kelas
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </button>
            </div>

            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img [src]="course.image" [alt]="course.title" (error)="course.image = 'https://placehold.co/600x400?text=No+Image'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <!-- Badge -->
               @if(course.badge) {
                  <div class="absolute top-4 left-4 z-10">
                    <span class="bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-secondary shadow-sm tracking-wide">
                      {{ course.badge }}
                    </span>
                  </div>
               }
            </div>

            <!-- Content -->
            <div class="p-5 flex flex-col flex-grow space-y-4">
              <h3 class="font-bold text-lg text-secondary leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {{ course.title }}
              </h3>
              
              <div class="flex items-center gap-2 mt-auto">
                <div class="flex text-accent">
                   <ng-container *ngFor="let star of [1,2,3,4,5]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="star" [class.text-gray-200]="star > (course.rating || 0)"><path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"/></svg>
                   </ng-container>
                </div>
                <span class="text-xs text-secondary/60 font-medium">({{ course.ratingCount || 0 }})</span>
                
                @if(course.series) {
                   <span class="ml-auto text-xs bg-gray-100 text-secondary/60 px-2 py-1 rounded">Series: {{course.series}}</span>
                }
              </div>
              
              <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div class="flex items-center gap-2 max-w-[70%]">
                   @if(course.authorImage) {
                     <img [src]="course.authorImage" class="w-6 h-6 rounded-full object-cover"> 
                   } @else {
                      <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-secondary/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                   }
                   <span class="text-xs text-secondary/60 truncate block">{{ course.author || '-' }}</span>
                </div>

                <div class="flex items-center gap-1.5 text-secondary/60">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
                  <span class="text-xs font-medium">{{ course.students }} students</span>
                </div>
              </div>
            </div>
          </div>
        </div>


    <!-- Add Course Modal -->
    @if (showAddModal) {
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="closeAddModal()"></div>
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-xl">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-secondary">Tambah Kursus Baru</h2>
            <button (click)="closeAddModal()" class="text-secondary/40 hover:text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
          </div>

          <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-secondary">Title</label>
              <input formControlName="title" type="text" placeholder="Masukkan judul kursus" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-bold text-secondary">Start Date</label>
                <input formControlName="startDate" type="date" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-secondary">End Date</label>
                <input formControlName="endDate" type="date" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-bold text-secondary">Thumbnail URL</label>
              <input formControlName="thumbnail" type="url" placeholder="https://example.com/image.jpg" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-bold text-secondary">Manager ID</label>
              <input formControlName="idManager" type="text" placeholder="UUID Manager" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-bold text-secondary">UUID Gojaks (Optional)</label>
              <input formControlName="uuidGojaks" type="text" placeholder="Optional UUID" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
            </div>

            <div class="flex justify-end gap-3 pt-6">
              <button type="button" (click)="closeAddModal()" class="px-6 py-3 rounded-xl font-bold text-secondary bg-gray-100 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button type="submit" [disabled]="courseForm.invalid || isSubmitting" class="px-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Saving...' : 'Save Course' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    }
      </div>
    </div>
  `
})
export class CoursesComponent implements OnInit {
  courses: Partial<Course>[] = [
    {
      title: 'Kelas Pelatihan Pranata Komputer Angkatan V',
      badge: 'Diklat Pranata Komputer Terampil',
      rating: 0,
      ratingCount: 0,
      series: 'Series',
      author: '-',
      students: 0,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    },
    {
      title: 'Uji Coba LMS-NG I',
      badge: 'Diklat Teknis',
      rating: 4,
      ratingCount: 4,
      author: 'Prof. Marcelo Mosciski',
      students: 20,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9759?w=400&h=250&fit=crop',
    },
    {
      title: 'Pelatihan Sensus Ekonomi 2026 V',
      badge: 'Pelatihan Subject Matter Survey Sensus',
      rating: 0,
      ratingCount: 0,
      author: '-',
      students: 6,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    },
    {
      title: 'Pelatihan Sensus Ekonomi 2026 III',
      badge: 'Pelatihan Subject Matter Survey Sensus',
      rating: 0,
      ratingCount: 0,
      author: '-',
      students: 13,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    }
  ];

  showAddModal = false;
  courseForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    this.courseForm = this.fb.group({
      uuidGojaks: [''],
      title: ['', Validators.required],
      thumbnail: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      idManager: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getGroupCourses().subscribe({
      next: (response) => {
        const data = Array.isArray(response) ? response : (response.data || []);
        
        // Map GroupCourse to Course for display
        this.courses = data.map((item: any) => ({
          title: item.title,
          image: item.thumbnail,
          badge: 'Group Course', 
          rating: 0,
          ratingCount: 0,
          students: 0,
          author: item.manager?.name || '-',
          series: item.start_date ? new Date(item.start_date).getFullYear().toString() : ''
        }));
      },
      error: (err) => {
        console.error('Failed to fetch group courses', err);
        // Fallback to existing mock data or handle empty state if needed
      }
    });
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.courseForm.reset();
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.isSubmitting = true;
      const formValue = this.courseForm.value;
      // Map to proper snake_case for API
      const request: CreateCourseRequest = {
        title: formValue.title,
        thumbnail: formValue.thumbnail,
        start_date: formValue.startDate,
        end_date: formValue.endDate,
        id_manager: formValue.idManager,
        uuid_gojaks: formValue.uuidGojaks || undefined,
      };
      
      this.courseService.createCourse(request).subscribe({
        next: (res) => {
          console.log('Course created successfully', res);
          this.isSubmitting = false;
          this.closeAddModal();
          // Initialize mock new course
          this.courses.unshift({
             title: request.title,
             image: request.thumbnail,
             badge: 'New',
             rating: 0,
             ratingCount: 0,
             students: 0,
             author: '-'
          });
          alert('Kursus berhasil ditambahkan!');
        },
        error: (err) => {
          console.error('Error creating course', err);
          this.isSubmitting = false;
          alert('Gagal menambahkan kursus.');
        }
      });
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
