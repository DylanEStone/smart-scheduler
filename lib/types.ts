// lib/types.ts
export type Priority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string; // Changed from number to string for better uniqueness
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  startTime?: string;
  endTime?: string;
  tags: string[];
  completed: boolean;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  createdAt: number;
  subtasks: Subtask[];
}

export type FilterType = 'all' | 'active' | 'completed' | 'today' | 'upcoming';