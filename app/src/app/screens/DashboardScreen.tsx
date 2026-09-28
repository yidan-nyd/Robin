import image_3012f0f5626d59780613288ec6eda843491cb98a from 'figma:asset/3012f0f5626d59780613288ec6eda843491cb98a.png'
import React from 'react';
import { useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/AppButton';
import { CloudRain, Sun, Droplets, Thermometer, Wind, Zap, AlertCircle, ChevronRight, ChevronLeft, Play, Battery, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import robotIcon from 'figma:asset/94d98822974a5479e2c8e6cc1293cc7a93522ef7.png';
import { cn } from '../../lib/utils';

const crops = [
  {
    id: 1,
    name: 'Cherry Tomatoes',
    image: 'https://images.unsplash.com/photo-1663310549878-eef93874df6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjB0b21hdG9lcyUyMHBsYW50fGVufDF8fHx8MTc3MzAyMTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    health: 98,
    status: 'Optimal',
    daysToHarvest: 14
  },
  {
    id: 2,
    name: 'Sweet Basil',
    image: 'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhc2lsJTIwcGxhbnR8ZW58MXx8fHwxNzcyOTk3MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    health: 85,
    status: 'Needs Water',
    daysToHarvest: 5
  },
  {
    id: 3,
    name: 'Romaine Lettuce',
    image: 'https://images.unsplash.com/photo-1579862715696-01a0aba3eb6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlJTIwZ3Jvd2luZ3xlbnwxfHx8fDE3NzMwMjE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    health: 100,
    status: 'Ready',
    daysToHarvest: 0
  }
];

export default function DashboardScreen() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Date & Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="text-sm font-medium text-stone-500 mb-1">Monday, October 23, 2026</p>
          <h2 className="text-3xl font-light text-stone-800 tracking-tight">Good morning, <span className="font-medium">Alex</span>.</h2>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <Button variant="soft"><CloudRain className="w-4 h-4 mr-2" /> Start Irrigation</Button>
          <Button><Zap className="w-4 h-4 mr-2" /> System Check</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Column (Weather & Robot) */}
        <div className="flex flex-col gap-6">
          {/* Weather Card */}
          <Card className="bg-[#a8a8a8] border-none relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#e5c175] blur-[80px] rounded-full opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#99e599] blur-[60px] rounded-full opacity-40 pointer-events-none"></div>
            
            <CardHeader className="relative z-10">
              <CardTitle className="text-white">Current Weather</CardTitle>
              <CardDescription className="text-white/70">Sunny conditions continuing</CardDescription>
            </CardHeader>
            <div className="relative z-10 flex items-end justify-between mt-4">
              <div>
                <span className="text-6xl font-light text-white tracking-tighter">28°</span>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center text-sm text-white/90 justify-end"><Wind className="w-4 h-4 mr-2" /> 12 km/h</div>
                <div className="flex items-center text-sm text-white/90 justify-end"><Droplets className="w-4 h-4 mr-2" /> 45%</div>
              </div>
            </div>
          </Card>

          {/* Robot Status Card */}
          <div 
            onClick={() => navigate('/robot')}
            className="bg-[#e4e4e4] rounded-[32px] p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-[#e0e0e0] border-2 border-transparent hover:border-[#d4ff00] group relative overflow-hidden"
          >
            <div className="flex flex-row justify-between items-center mb-6">
              <h3 className="text-[22px] font-normal text-stone-800 tracking-tight">AgroBot Status</h3>
              <div className="bg-[#cbe5cc] text-[#2c4c2a] px-3.5 py-1 rounded-full text-[13px] font-medium">
                Active
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-[72px] h-[72px] rounded-[24px] overflow-hidden flex-shrink-0 relative shadow-sm">
                <ImageWithFallback src={image_3012f0f5626d59780613288ec6eda843491cb98a} alt="Robot Minimal Icon" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-normal text-stone-800 text-[17px] tracking-tight">Task: Watering Sector B</p>
                <div className="flex items-center mt-1.5 text-[14px] text-stone-500 font-light">
                  <Battery className="w-4 h-4 text-[#8bca84] mr-1.5" strokeWidth={1.5} /> 78% Battery
                </div>
              </div>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex justify-between text-[14px] font-normal">
                <span className="text-stone-500">Progress</span>
                <span className="text-stone-800">65%</span>
              </div>
              <div className="h-2.5 w-full bg-[#d4d4d4] rounded-full overflow-hidden">
                <div className="h-full bg-[#dfff38] rounded-full shadow-[0_0_12px_rgba(223,255,56,0.6)]" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          
          {/* AI Insights Card */}
          <Card className="bg-[#b5b5b5]/50 border-white/20">
            <CardHeader className="pb-2">
              <div className="flex items-center text-stone-800 font-medium mb-1">
                <Zap className="w-4 h-4 mr-2 text-[#d4ff00] fill-[#d4ff00]" /> AI Assistant
              </div>
            </CardHeader>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Tomato soil moisture is dropping faster than usual. Consider running an extra 5-minute irrigation cycle tonight.
            </p>
            <Button className="mt-6 w-full font-medium">Apply Action</Button>
          </Card>

          {/* Resource Levels Card */}
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>Resource Levels</CardTitle>
            </CardHeader>
            <div className="space-y-4 mt-2 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <div className="flex justify-between text-[13px] font-medium">
                  <span className="flex items-center text-stone-600"><Droplets className="w-4 h-4 mr-1.5 text-[#8bc1ff]" /> Water Tank</span>
                  <span className="text-stone-800">82%</span>
                </div>
                <div className="h-2.5 w-full bg-[#e4e4e4]/80 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8bc1ff] rounded-full shadow-[0_0_10px_rgba(139,193,255,0.5)]" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="space-y-2 pt-3">
                <div className="flex justify-between text-[13px] font-medium">
                  <span className="flex items-center text-stone-600"><AlertCircle className="w-4 h-4 mr-1.5 text-[#e08bff]" /> Nutrients</span>
                  <span className="text-stone-800">45%</span>
                </div>
                <div className="h-2.5 w-full bg-[#e4e4e4]/80 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e08bff] rounded-full shadow-[0_0_10px_rgba(224,139,255,0.5)]" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Middle & Right Column (Crops & Environment) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Environment Overview (Bento Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-stretch">
            {[
              { label: 'Avg Temp', value: '24°C', icon: Thermometer, blur: 'bg-[#ffcc80]' },
              { label: 'Humidity', value: '68%', icon: Droplets, blur: 'bg-[#8bc1ff]' },
              { label: 'Light Level', value: 'High', icon: Sun, blur: 'bg-[#e5c175]' },
              { label: 'Soil pH', value: '6.5', icon: AlertCircle, blur: 'bg-[#e08bff]' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#b5b5b5]/30 backdrop-blur-md rounded-[32px] p-5 relative overflow-hidden group border border-white/10 shadow-sm">
                <div className={`absolute top-4 right-4 w-12 h-12 ${stat.blur} blur-2xl opacity-50 rounded-full group-hover:scale-150 transition-transform`}></div>
                <stat.icon className="relative z-10 w-6 h-6 text-stone-700 mb-6" />
                <div className="relative z-10">
                  <p className="text-stone-500 text-xs mb-1 font-medium">{stat.label}</p>
                  <p className="text-stone-800 text-2xl font-light">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Plant Health */}
          <Card className="flex-1">
            <CardHeader className="flex flex-row justify-between items-center mb-6">
              <div>
                <CardTitle>Crop Production</CardTitle>
                <CardDescription>Current state of your active zones</CardDescription>
              </div>
              <Button 
                variant="soft" 
                size="sm" 
                className="group rounded-full"
                onClick={() => navigate('/plants')}
              >
                View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardHeader>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div 
                  key={crop.id} 
                  onClick={() => navigate('/plants', { state: { selectedPlantId: crop.id } })}
                  className="group relative rounded-[32px] overflow-hidden bg-[#e6e6e6] cursor-pointer transition-all duration-300 p-3.5 border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)]"
                >
                  <div className="h-32 w-full overflow-hidden rounded-[24px] relative">
                    <ImageWithFallback src={crop.image} alt={crop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50"></div>
                    <div className="absolute top-3 right-3">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[13px] font-medium text-stone-900 shadow-sm",
                        crop.health === 100 ? 'bg-[#a2c87b]' : crop.health > 90 ? 'bg-[#dfff38]' : 'bg-[#8f9864]'
                      )}>
                        {crop.health}%
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 pb-1 px-2">
                    <h4 className="text-[17px] font-medium text-stone-800 tracking-tight">{crop.name}</h4>
                    <div className="flex justify-between items-center mt-3 text-[13px]">
                      <span className={cn(
                        "font-medium px-3 py-1 rounded-full", 
                        crop.status === 'Needs Water' ? 'bg-[#eec5c5] text-[#b33a3a]' : 'bg-white/90 text-stone-600'
                      )}>
                        {crop.status}
                      </span>
                      <span className="text-stone-500 font-medium">{crop.daysToHarvest}d left</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Calendar & Schedule Bento Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            
            {/* Weekly Calendar Widget */}
            <div className="rounded-[32px] overflow-hidden flex flex-col border border-black/[0.03] shadow-[0_2px_16px_rgba(0,0,0,0.02)] bg-white group transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              {/* Top Header (Gradient) */}
              <div className="bg-gradient-to-br from-[#9c9e97] to-[#c2c5ba] pt-6 pb-5 px-3 text-center relative flex flex-col items-center justify-center transition-all duration-300">
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 blur-[30px] rounded-full pointer-events-none group-hover:bg-white/20 transition-colors"></div>
                <div className="flex items-center justify-between w-full relative z-10 px-3">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors cursor-pointer">
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <div className="flex flex-col items-center">
                    <h3 className="text-[26px] font-light text-white tracking-tight leading-none mb-1 cursor-default">October 2026</h3>
                    <p className="text-[13px] font-medium text-white/80 cursor-default">Week 43</p>
                  </div>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors cursor-pointer">
                    <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              
              {/* Bottom Dates */}
              <div className="bg-[#ebebeb] flex-1 px-5 py-6 flex flex-col justify-center">
                <div className="flex justify-between items-center text-[11px] font-medium text-stone-400 tracking-wider mb-4 px-2.5">
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
                <div className="flex justify-between items-center px-0.5">
                  {[
                    { day: 23, active: true },
                    { day: 24, active: false },
                    { day: 25, active: false },
                    { day: 26, active: false },
                    { day: 27, active: false },
                    { day: 28, active: false },
                    { day: 29, active: false },
                  ].map((d, i) => (
                    <button 
                      key={i} 
                      className={cn(
                        "w-[38px] h-[38px] rounded-full flex items-center justify-center text-[16px] font-normal transition-all duration-300",
                        d.active 
                          ? "bg-[#dfff38] text-stone-900 shadow-[0_4px_12px_rgba(223,255,56,0.25)] scale-[1.08]" 
                          : "text-stone-500 hover:bg-[#d4d4d4] hover:text-stone-900"
                      )}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="rounded-[32px] border border-black/[0.03] shadow-[0_2px_16px_rgba(0,0,0,0.02)] bg-white flex flex-col overflow-hidden h-full">
              <div className="flex flex-row items-center justify-between pb-1 pt-6 px-6">
                <h3 className="text-lg font-medium text-stone-800 tracking-tight">Daily Plan</h3>
                <span className="text-[12px] font-medium text-stone-500 bg-[#f4f4f4] px-3 py-1 rounded-full">Oct 23</span>
              </div>
              
              <div className="space-y-1.5 mt-3 px-4 pb-6 flex-1 flex flex-col justify-center">
                {[
                  { time: '08:00 AM', task: 'Morning Irrigation', zone: 'All Zones', status: 'done' },
                  { time: '02:30 PM', task: 'Nutrient Delivery', zone: 'Tomato Beds', status: 'pending' },
                  { time: '06:00 PM', task: 'Pest Scan', zone: 'Lettuce Trays', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center p-3 rounded-[20px] hover:bg-[#f4f4f4] transition-colors group cursor-pointer">
                    <div className="w-16 flex-shrink-0 text-[11px] font-medium text-stone-400">{item.time}</div>
                    <div className="flex-1 px-1">
                      <p className={cn("text-[14px] font-medium transition-colors", item.status === 'done' ? "text-stone-400 line-through" : "text-stone-700")}>{item.task}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{item.zone}</p>
                    </div>
                    <div>
                      {item.status === 'done' ? (
                        <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-stone-300">
                          <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                      ) : (
                        <button className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm flex items-center justify-center text-stone-600 hover:bg-[#dfff38] hover:text-stone-900 border border-black/5">
                          <Play className="w-3 h-3 ml-0.5" fill="currentColor" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
