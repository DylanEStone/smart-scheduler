'use client';
import { useStore } from '@/lib/store';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths 
} from 'date-fns';

export default function Calendar() {
  const { 
    calendarMonth, setCalendarMonth, 
    selectedDate, setSelectedDate, 
    tasks 
  } = useStore();

  const handlePrevMonth = () => setCalendarMonth(subMonths(calendarMonth, 1));
  const handleNextMonth = () => setCalendarMonth(addMonths(calendarMonth, 1));

  // Generate calendar grid dates
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Helper to check for tasks on a day
  const getDayStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayTasks = tasks.filter(t => t.dueDate === dateStr);
    const hasActive = dayTasks.some(t => !t.completed);
    const hasOverdue = dayTasks.some(t => !t.completed && new Date(t.dueDate) < new Date());
    
    return { hasTasks: dayTasks.length > 0, hasActive, hasOverdue, count: dayTasks.length };
  };

  return (
    <div className="calendar-view">
      {/* Header */}
      <div className="calendar-header flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="btn-icon">◀</button>
        <h2 className="text-xl font-bold">{format(calendarMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="btn-icon">▶</button>
      </div>

      {/* Grid */}
      <div className="calendar-grid grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center font-bold text-sm py-2">{d}</div>
        ))}
        
        {days.map((day) => {
          const status = getDayStatus(day);
          const isSelected = selectedDate === format(day, 'yyyy-MM-dd');
          const isCurrentMonth = isSameMonth(day, calendarMonth);

          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDate(format(day, 'yyyy-MM-dd'))}
              className={`
                h-16 border rounded flex flex-col items-start p-1 relative transition-colors
                ${!isCurrentMonth ? 'opacity-40 bg-gray-50' : 'bg-white'}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                ${status.hasOverdue ? 'border-red-300 bg-red-50' : ''}
              `}
            >
              <span className="text-xs font-semibold">{format(day, 'd')}</span>
              {status.hasTasks && (
                <div className="mt-1 flex gap-1">
                  <span className={`w-2 h-2 rounded-full ${status.hasActive ? 'bg-blue-500' : 'bg-green-500'}`} />
                  <span className="text-[10px] text-gray-500">
                    {status.count}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}