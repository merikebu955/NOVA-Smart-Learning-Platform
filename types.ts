
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  department: string;
  role: UserRole;
  photo?: string;
  attendancePercent?: number;
}

export interface Classroom {
  id: string;
  name: string;
  teacherId: string;
  department: string;
  studentCount: number;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  day: string;
  type: 'CLASS' | 'QUIZ' | 'TEST';
  link?: string;
  classroom?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  timeIn?: string;
  timeOut?: string;
  duration?: string;
}

export interface Mark {
  id: string;
  studentId: string;
  subject: string;
  grade: string;
  score: number;
}

export interface Announcement {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  classId?: string;
}
