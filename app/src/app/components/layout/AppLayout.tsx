import logoFull from 'figma:asset/659b5548fc25c9d1aba84f05d2539df387bd03a8.png';
import logoIcon from 'figma:asset/8e852dbc64777f376038ab92c7bd711b59fc6c8c.png';
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Home, Map as MapIcon, Calendar, Leaf, Bot, BarChart3, Bell, Settings, Search, Menu, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Garden Map', path: '/map', icon: MapIcon },
    { name: 'Task Planner', path: '/tasks', icon: Calendar },
    { name: 'Plant Monitor', path: '/plants', icon: Leaf },
    { name: 'Robot Control', path: '/robot', icon: Bot },
    { name: 'Data Reports', path: '/reports', icon: BarChart3 },
    { name: 'Community', path: '/community', icon: Users },
  ];

  return (
    <div className="flex h-screen w-full bg-[#efefef] text-stone-800 overflow-hidden font-sans selection:bg-[#d4ff00] selection:text-black">
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? '80px' : '256px'
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0, 0.2, 1]
        }}
        className="hidden md:flex flex-col bg-[#e4e4e4]/50 backdrop-blur-xl border-r border-white/20 z-20 relative"
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center justify-center px-4 relative">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full"
              >
                <img 
                  src={logoFull} 
                  alt="ROBIN" 
                  className="h-8 w-auto object-contain opacity-70 saturate-[0.85] contrast-[0.92]" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="icon-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <img 
                  src={logoFull} 
                  alt="ROBIN" 
                  className="h-7 w-auto object-contain opacity-70 saturate-[0.85] contrast-[0.92]" 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Navigation Items */}
        <div className="flex-1 py-6 overflow-y-auto px-4 space-y-1">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mb-4 px-4"
              >
                Menu
              </motion.div>
            )}
          </AnimatePresence>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center py-3.5 rounded-full transition-all duration-300 group relative",
                  sidebarCollapsed ? "justify-center px-0" : "px-4",
                  isActive 
                    ? "bg-[#d4ff00] text-stone-900 font-medium shadow-sm" 
                    : "text-stone-500 hover:bg-[#dcdcdc]/60 hover:text-stone-800"
                )}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <item.icon 
                  className={cn(
                    "w-5 h-5 transition-colors shrink-0",
                    sidebarCollapsed ? "mr-0" : "mr-3",
                    isActive ? "text-stone-900" : "text-stone-400 group-hover:text-stone-600"
                  )} 
                />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </div>

        {/* User Profile */}
        <div className={cn(
          "p-4 transition-all duration-300",
          sidebarCollapsed ? "px-2" : "px-6"
        )}>
          <div className={cn(
            "flex items-center rounded-full bg-[#dcdcdc]/50 backdrop-blur-md border border-white/20 transition-all duration-300",
            sidebarCollapsed ? "p-1.5 justify-center" : "p-2"
          )}>
            <div className="w-10 h-10 rounded-full bg-[#d4ff00] flex items-center justify-center text-stone-900 font-bold overflow-hidden shrink-0">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 pr-4 truncate overflow-hidden"
                >
                  <p className="text-sm font-medium text-stone-800 truncate">Alex Moor</p>
                  <p className="text-[11px] text-stone-500 truncate">Home Garden</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-28 w-6 h-6 bg-white border-2 border-[#e4e4e4] rounded-full flex items-center justify-center text-stone-600 hover:bg-[#d4ff00] hover:text-stone-900 hover:border-[#d4ff00] transition-all duration-300 shadow-md z-30"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.div 
        initial={false}
        animate={{ 
          marginLeft: 0
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0, 0.2, 1]
        }}
        className="flex-1 flex flex-col min-w-0 overflow-hidden relative"
      >
        {/* Top Header */}
        <header className="h-24 bg-transparent flex items-center justify-between px-8 z-10 sticky top-0 shrink-0">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </Button>
            <img 
              src={logoIcon} 
              alt="ROBIN" 
              className="ml-3 h-6 w-auto object-contain opacity-70 saturate-[0.8]" 
            />
          </div>
          
          <div className="hidden md:flex flex-1">
            <h1 className="text-3xl font-light tracking-tight text-stone-800">
              {navItems.find(item => item.path === location.pathname)?.name || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex relative text-stone-400 focus-within:text-stone-800">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#e4e4e4]/80 backdrop-blur-md rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4ff00] transition-shadow w-64 border-none text-stone-800 placeholder:text-stone-400"
              />
            </div>
            
            <Button variant="soft" size="icon" className="relative rounded-full bg-[#e4e4e4]/80">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ff4d4d] rounded-full border-2 border-[#efefef]"></span>
            </Button>
            
            <Button variant="soft" size="icon" className="rounded-full hidden md:inline-flex bg-[#e4e4e4]/80">
              <Settings className="w-5 h-5 text-stone-600" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-transparent p-4 md:px-8 md:pb-8 relative">
          {/* Global Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/40 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="max-w-7xl mx-auto space-y-8 pb-20 md:pb-8">
            <Outlet />
          </div>
        </main>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-[#e4e4e4]/90 backdrop-blur-xl border border-white/20 flex justify-around p-2 rounded-full z-30 shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors",
                isActive ? "bg-[#d4ff00] text-stone-900" : "text-stone-400 hover:text-stone-600"
              )}
            >
              <item.icon className="w-5 h-5" />
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}