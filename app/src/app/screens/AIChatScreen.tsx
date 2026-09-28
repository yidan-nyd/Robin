import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Zap, MoreHorizontal, Bell, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function AIChatScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const plantId = location.state?.plantId;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Derive initial context message
  const initialContext = plantId === 1 
    ? "I noticed the Tomato soil moisture is dropping faster than usual. I've prepared a 5-minute irrigation cycle tonight to compensate. Would you like me to proceed?"
    : plantId === 2
    ? "Soil moisture for Sweet Basil is critically low. Should I trigger an immediate irrigation cycle?"
    : "How can I assist you with your garden's automation today?";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: initialContext,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I've updated the schedule. The irrigation sequence will begin as instructed. I'll monitor the moisture levels and alert you if they don't stabilize by morning.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full bg-[#f8f8f8] -m-4 p-4 sm:-m-6 sm:p-6 lg:-m-8 lg:p-8 rounded-[40px] font-sans text-stone-800 flex flex-col relative overflow-hidden">
      
      {/* Top Global Header (matching design) */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h1 className="text-[26px] font-light text-stone-700 tracking-tight">Overview</h1>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#f0f0f0] rounded-full pl-5 pr-4 py-2 text-sm focus:outline-none w-[200px] placeholder:text-stone-400 text-stone-700 transition-colors focus:bg-white focus:ring-1 focus:ring-stone-200"
            />
          </div>
          <button className="w-9 h-9 bg-[#f0f0f0] rounded-full flex items-center justify-center text-stone-600 relative hover:bg-[#e8e8e8] transition-colors">
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-400 rounded-full border border-[#f0f0f0] box-content"></span>
          </button>
          <button className="w-9 h-9 bg-[#f0f0f0] rounded-full flex items-center justify-center text-stone-600 hover:bg-[#e8e8e8] transition-colors">
            <Settings className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div className="w-9 h-9 rounded-full bg-pink-100 overflow-hidden ml-1 border border-black/5">
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Chat Card Header */}
      <div className="flex items-center justify-between mb-8 z-10 bg-white p-2.5 rounded-[40px] shadow-[0_2px_16px_rgba(0,0,0,0.02)] border border-black/[0.03]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-11 h-11 bg-[#f8f8f8] hover:bg-[#f0f0f0] rounded-full flex items-center justify-center transition-colors text-stone-500 ml-1"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#ebf5cc] rounded-full flex items-center justify-center relative">
              <Zap className="w-5 h-5 text-[#8ac700] fill-[#8ac700]" strokeWidth={1} />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#8ac700] rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col justify-center mt-0.5">
              <h2 className="text-[16px] font-medium text-stone-800 leading-tight">AI Assistant</h2>
              <p className="text-[12px] text-stone-400 font-light flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8ac700] inline-block"></span>
                Online & Monitoring
              </p>
            </div>
          </div>
        </div>

        <button className="w-11 h-11 bg-[#f8f8f8] hover:bg-[#f0f0f0] rounded-full flex items-center justify-center transition-colors text-stone-400 mr-1">
          <MoreHorizontal className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-6 z-10 space-y-6 scrollbar-hide flex flex-col pt-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isAI = msg.sender === 'ai';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={cn(
                  "flex flex-col max-w-[85%] sm:max-w-[75%]",
                  isAI ? "self-start items-start" : "self-end items-end"
                )}
              >
                <div 
                  className={cn(
                    "p-4 px-5 text-[14px] leading-relaxed tracking-wide",
                    isAI 
                      ? "bg-white rounded-[24px] rounded-tl-[8px] text-stone-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black/[0.03]" 
                      : "bg-[#d4ff00] text-stone-900 rounded-[24px] rounded-tr-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black/[0.03]"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] text-stone-400 mt-2 px-2">
                  {msg.timestamp}
                </span>
              </motion.div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="self-start items-start flex max-w-[80%]"
            >
              <div className="bg-white rounded-[24px] rounded-tl-[8px] p-4 px-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-black/[0.03] flex items-center gap-1.5 h-[56px]">
                <motion.div 
                  className="w-1.5 h-1.5 bg-stone-300 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-stone-300 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-stone-300 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="z-10 mt-auto">
        <div className="bg-white p-2 pl-6 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.03] flex items-center relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AgroFlow AI..."
            className="flex-1 bg-transparent border-none focus:outline-none text-stone-700 placeholder:text-stone-400 text-[15px]"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm shrink-0 ml-2",
              inputValue.trim()
                ? "bg-[#d4ff00] hover:bg-[#cbf200] text-stone-900"
                : "bg-[#f5f5f5] text-stone-400"
            )}
          >
            <Send className={cn("w-5 h-5 ml-0.5 m-[0px]", !inputValue.trim() && "text-stone-300")} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}