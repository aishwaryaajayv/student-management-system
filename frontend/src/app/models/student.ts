
import { Course } from './course';

export interface Student {
  id?: number;
  name: string;
  email: string;
  courses: Course[];
}
