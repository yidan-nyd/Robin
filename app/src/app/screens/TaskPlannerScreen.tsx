import React from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/AppButton';
import { Badge } from '../components/ui/Badge';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Circle, AlertCircle, Plus, Sparkles } from 'lucide-react';

export default function TaskPlannerScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [23, 24, 25, 26, 27, 28, 29];
  
  const tasks = [
    { id: 1, title: 'Morning Irrigation Cycle', time: '08:00 AM', duration: '45m', type: 'automated', status: 'completed', date: 23 },
    { id: 2, title: 'Prune Tomato Plants', time: '10:30 AM', duration: '1h 30m', type: 'manual', status: 'pending', date: 23 },
    { id: 3, title: 'Nutrient Mix Refill', time: '02:00 PM', duration: '15m', type: 'manual', status: 'overdue', date: 23 },
    { id: 4, title: 'Evening Pest Scan', time: '06:00 PM', duration: '30m', type: 'robot', status: 'upcoming', date: 23 },
    { id: 5, title: 'Harvest Lettuce', time: '09:00 AM', duration: '2h', type: 'manual', status: 'upcoming', date: 24 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      
      {/* Calendar Sidebar */}
      <div className="flex flex-col gap-6">
        <div className="bg-[#b5b5b5]/30 backdrop-blur-md rounded-[36px] overflow-hidden shadow-sm shrink-0">
          <div className="bg-[#a8a8a8] p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ff00] blur-[60px] opacity-30 rounded-full pointer-events-none"></div>
            <h3 className="text-2xl font-light tracking-tight mb-1 relative z-10">October 2026</h3>
            <p className="text-white/70 text-sm relative z-10">Week 43</p>
          </div>
          <div className="p-6 grid grid-cols-7 gap-2 text-center">
            {days.map(d => <div key={d} className="text-[10px] font-medium text-stone-400 uppercase tracking-wider mb-2">{d}</div>)}
            {dates.map((d, i) => (
              <button 
                key={d} 
                className={`w-full aspect-square flex items-center justify-center rounded-[16px] text-sm font-medium transition-all
                  ${d === 23 ? 'bg-[#d4ff00] text-stone-900 shadow-sm scale-110' : 'text-stone-600 hover:bg-[#e4e4e4]'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Quick Filters</CardTitle>
          </CardHeader>
          <div className="space-y-2 text-sm">
            {[
              { label: 'All Tasks', checked: true },
              { label: 'Manual Operations', checked: true },
              { label: 'Robot Tasks', checked: true },
              { label: 'Automated System', checked: true }
            ].map((filter, i) => (
              <label key={i} className="flex items-center space-x-3 p-3 rounded-[20px] hover:bg-[#e4e4e4]/60 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  defaultChecked={filter.checked} 
                  className="rounded bg-white border-stone-300 text-[#d4ff00] focus:ring-[#d4ff00] focus:ring-offset-[#f4f4f4]" 
                />
                <span className="text-stone-700 font-medium">{filter.label}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Weekly Progress Fill Card */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-end justify-between mb-3">
               <span className="text-4xl font-light text-stone-800">18</span>
               <span className="text-sm text-stone-500 mb-1 font-medium">/ 24 tasks</span>
            </div>
            <div className="h-2.5 w-full bg-[#e4e4e4]/80 rounded-full overflow-hidden">
                <div className="h-full bg-[#d4ff00] rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-stone-500 mt-5 leading-relaxed">You are on track to complete all essential farming routines this week.</p>
          </div>
        </Card>
      </div>

      {/* Task List */}
      <Card className="lg:col-span-2 h-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-light text-stone-800 tracking-tight">Today's Timeline</h3>
            <p className="text-sm text-stone-500 mt-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#e5c175]" /> 4 tasks scheduled
            </p>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> New Task</Button>
        </div>
        
        <div className="relative mt-2">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[95px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#d4ff00]/50 via-stone-300/50 to-stone-300/20 rounded-full"></div>
          
          <div className="space-y-6">
            {tasks.filter(t => t.date === 23).map((task) => (
              <div key={task.id} className="relative flex items-start group">
                {/* Timeline dot */}
                <div className="absolute left-[89px] w-3.5 h-3.5 rounded-full bg-[#f4f4f4] border-[3px] border-stone-300 z-10 transition-transform group-hover:scale-125 mt-1.5"
                     style={{ 
                       borderColor: task.status === 'completed' ? '#99e599' : 
                                    task.status === 'overdue' ? '#ff4d4d' : 
                                    task.status === 'pending' ? '#d4ff00' : undefined 
                     }}
                ></div>
                
                {/* Time */}
                <div className="w-[88px] flex-shrink-0 text-sm font-medium text-stone-500 pt-1 text-right pr-5">
                  {task.time.split(' ')[0]}
                  <span className="text-[10px] ml-1 opacity-70 block sm:inline">{task.time.split(' ')[1]}</span>
                </div>
                
                {/* Task Card */}
                <div className={`flex-1 rounded-[28px] p-5 transition-all duration-300 cursor-pointer ml-6
                  ${task.status === 'completed' ? 'bg-[#e4e4e4]/40 opacity-70' : 
                    task.status === 'overdue' ? 'bg-[#ff4d4d]/10' : 
                    'bg-[#e4e4e4]/80 hover:bg-white hover:shadow-sm'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-medium text-[16px] ${task.status === 'completed' ? 'text-stone-500 line-through' : 'text-stone-800'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center mt-3 space-x-3 text-xs text-stone-500">
                        <span className="flex items-center font-medium bg-white/50 px-2 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-stone-400" /> {task.duration}
                        </span>
                        <span className="flex items-center capitalize">
                          {task.type === 'robot' ? <Badge variant="outline" className="bg-[#8bc1ff]/20 text-blue-700 border-none">Robot</Badge> : 
                           task.type === 'manual' ? <Badge variant="outline" className="bg-[#ffcc80]/20 text-orange-700 border-none">Manual</Badge> :
                           <Badge variant="outline" className="bg-[#d4ff00]/30 text-stone-800 border-none">System</Badge>}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pl-4">
                      {task.status === 'completed' ? <CheckCircle2 className="w-7 h-7 text-[#99e599]" /> : 
                       task.status === 'overdue' ? <AlertCircle className="w-7 h-7 text-[#ff4d4d]" /> :
                       <Circle className="w-7 h-7 text-stone-300 hover:text-[#d4ff00] transition-colors" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

    </div>
  );
}
