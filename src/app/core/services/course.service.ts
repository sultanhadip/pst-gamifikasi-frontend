import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateCourseRequest, Course } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://gatewaylms-dev.etc-nso.id/course/api/v1/courses'; // Adjust endpoint as needed

  constructor(private http: HttpClient) {}


  createCourse(course: CreateCourseRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/group-courses', course);
  }

  getGroupCourses(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/group-courses');
  }
}
