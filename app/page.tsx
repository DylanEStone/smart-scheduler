'use client';
import { useStore } from '@/lib/store';
import Calendar from '@/components/Calendar';
import TaskForm from '@/components/TaskForm';
import { useEffect } from 'react';

// You would create a simple TaskList component similar to TaskForm
function TaskList() {
  const { tasks, selectedDate, toggleTaskCompletion } = useStore();
  
  const dailyTasks = tasks.filter(t => t.dueDate === selectedDate);

  if (dailyTasks.length === 0) return <div className="text-gray-500 mt-4">No tasks for this day.</div>;

  return (
    <div className="space-y-2 mt-4">
      {dailyTasks.map(task => (
        <div key={task.id} className="flex items-center p-3 border rounded bg-white shadow-sm">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleTaskCompletion(task.id)}
            className="mr-3 h-5 w-5"
          />
          <div>
            <div className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </div>
            {task.startTime && (
               <div className="text-xs text-gray-500">
                 {task.startTime} {task.endTime ? `- ${task.endTime}` : ''}
               </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  // Theme initialization
  const { theme } = useStore();
  
  useEffect(() => {
    document.body.className = theme; // Apply global theme class
  }, [theme]);

  return (
    <main className="min-h-screen bg-gray-100 flex p-4 gap-6">
      
      {/* Sidebar / Main Content Area */}
      <section className="flex-1 space-y-6 max-w-3xl">
         {/* You can add your Sidebar filters here or as a separate component */}
         <div className="bg-white p-6 rounded-lg shadow">
           <Calendar />
         </div>
      </section>

      {/* Right Side Panel (Daily View) */}
      <aside className="w-96 space-y-6">
        <TaskForm />
        
        <div className="bg-white p-4 rounded-lg shadow min-h-[300px]">
          <h3 className="font-bold text-lg mb-2">Tasks</h3>
          <TaskList />
        </div>
      </aside>
    </main>
  );
}