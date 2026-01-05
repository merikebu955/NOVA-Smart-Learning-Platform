
import { ScheduleItem, AttendanceRecord, Mark, Classroom, Announcement } from './types';

export const SAMPLE_CLASSES: Classroom[] = [
  { id: 'c1', name: 'Advanced Mathematics', teacherId: 't1', department: 'Computer Science', studentCount: 45 },
  { id: 'c2', name: 'Data Structures', teacherId: 't1', department: 'Software Engineering', studentCount: 38 },
  { id: 'c3', name: 'AI Ethics', teacherId: 't2', department: 'Computer Science', studentCount: 22 },
];

export const SAMPLE_SCHEDULE: ScheduleItem[] = [
  { id: '1', subject: 'Advanced Mathematics', teacher: 'Dr. Sarah Wilson', time: '09:00 AM - 10:30 AM', day: 'Monday', type: 'CLASS', link: 'https://meet.google.com/abc-defg-hij' },
  { id: '2', subject: 'Data Structures', teacher: 'Prof. James Bond', time: '11:00 AM - 12:30 PM', day: 'Monday', type: 'CLASS', classroom: 'Room 302' },
  { id: '3', subject: 'Cloud Computing Quiz', teacher: 'Dr. Mike Ross', time: '02:00 PM - 03:00 PM', day: 'Tuesday', type: 'QUIZ' },
  { id: '4', subject: 'AI Ethics', teacher: 'Dr. Jane Doe', time: '10:00 AM - 11:30 AM', day: 'Wednesday', type: 'CLASS', link: 'https://meet.google.com/xyz-pdq-rst' },
];

export const SAMPLE_ATTENDANCE: AttendanceRecord[] = [
  { id: '1', studentId: 's1', date: '2024-05-15', status: 'PRESENT', timeIn: '08:55 AM', timeOut: '10:30 AM', duration: '1h 35m' },
  { id: '2', studentId: 's1', date: '2024-05-16', status: 'PRESENT', timeIn: '10:58 AM', timeOut: '12:30 PM', duration: '1h 32m' },
];

export const SAMPLE_MARKS: Mark[] = [
  { id: '1', studentId: 's1', subject: 'Advanced Mathematics', grade: 'A', score: 92 },
  { id: '2', studentId: 's1', subject: 'Data Structures', grade: 'B+', score: 85 },
];

export const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', sender: 'Dr. Sarah Wilson', text: 'Reminder: The midterm exam is rescheduled to next Friday.', timestamp: new Date(), classId: 'c1' },
  { id: 'a2', sender: 'Admin Office', text: 'Department meeting at 3 PM in the main hall.', timestamp: new Date() },
];
