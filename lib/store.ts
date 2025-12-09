// lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, FilterType, Priority } from './types';

interface AppState {
  tasks: Task[];
  tags: string[];
  theme: 'light' | 'dark';
  filter: FilterType;
  
  // Calendar State
  calendarMonth: Date;
  selectedDate: string | null;

  // Actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setCalendarMonth: (date: Date) => void;
  setSelectedDate: (date: string | null) => void;
  toggleTheme: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      tags: [],
      theme: 'light',
      filter: 'all',
      calendarMonth: new Date(),
      selectedDate: new Date().toISOString().split('T')[0],

      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      })),

      toggleTaskCompletion: (id) => set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      })),

      setFilter: (filter) => set({ filter }),
      
      setCalendarMonth: (date) => set({ calendarMonth: date }),
      
      setSelectedDate: (date) => set({ selectedDate: date }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'smart-scheduler-storage', // Key for localStorage
      partialize: (state) => ({ 
        tasks: state.tasks, 
        tags: state.tags, 
        theme: state.theme 
      }), // Only persist these fields
    }
  )
);