export interface Course {
  title: string;
  badge: string;
  rating: number;
  ratingCount: number;
  author: string;
  students: number;
  image: string;
  series?: string;
  authorImage?: string;
  type?: string; // For compatibility if needed
}

export interface Stat {
  label: string;
  value: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  initial: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface CreateCourseRequest {
  uuid_gojaks?: string;
  title: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  id_manager: string;
}

export interface GroupCourse {
  id: string;
  uuid_gojaks?: string;
  title: string;
  thumbnail: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  manager: {
    id: string;
    name: string;
    email: string;
  };
}
