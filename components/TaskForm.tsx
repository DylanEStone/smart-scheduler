'use client';
import { useState, FormEvent } from 'react';
import { useStore } from '@/lib/store';
import { Task } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid'; // You'll need `npm install uuid`

export default function TaskForm() {
  const { addTask, selectedDate } = useStore();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: selectedDate || '',
    priority: 'medium',
    startTime: '',
    endTime: '',
    tags: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newTask: Task = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority as any,
      startTime: formData.startTime,
      endTime: formData.endTime,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      completed: false,
      recurrence: 'none',
      createdAt: Date.now(),
      subtasks: []
    };

    addTask(newTask);
    
    // Reset form
    setFormData(prev => ({ ...prev, title: '', description: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-4">
      <h3 className="text-lg font-bold">Add New Task</h3>
      
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="p-2 border rounded"
            value={formData.dueDate}
            onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <select
            className="p-2 border rounded"
            value={formData.priority}
            onChange={e => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <input 
             type="time" 
             className="p-2 border rounded"
             value={formData.startTime} 
             onChange={e => setFormData({...formData, startTime: e.target.value})} 
           />
           <input 
             type="time" 
             className="p-2 border rounded"
             value={formData.endTime} 
             onChange={e => setFormData({...formData, endTime: e.target.value})} 
           />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Save Task
      </button>
    </form>
  );
}