import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';

export const TerminalWidget = ({ className = '' }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'cmd', text: 'innovision --status' },
    { type: 'output', text: 'Status: ONLINE (All 12 events active)' },
  ]);
  const inputRef = useRef(null);
  const historyContainerRef = useRef(null);
  const isFirstRender = useRef(true);
  const { scrollTo } = useLenis();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'cmd', text: cmdText }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Commands: help, events, register, status, venue, clear',
        });
        break;
      case 'events':
        newHistory.push({
          type: 'output',
          text: '12 Events: Code Clash, Web Hackathon, Brain Spark, Type Race, NextPreneur, Tech Hunt, BGMI Tournament, Mobile Legends, E-Football, Frame Flick, Photography, Painting.',
        });
        scrollTo('#events');
        break;
      case 'register':
        newHistory.push({
          type: 'output',
          text: 'Navigating to registration catalog...',
        });
        scrollTo('#events');
        break;
      case 'status':
        newHistory.push({
          type: 'output',
          text: '[SYSTEM]: INNOVISION 2026 ONLINE // ICFAI SIKKIM',
        });
        break;
      case 'venue':
        newHistory.push({
          type: 'output',
          text: 'N.J. Yasaswya Auditorium, ICFAI Sikkim (Nov 2026)',
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Unknown command: "${cmd}". Type "help".`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleCommand = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <div className={`relative select-none ${className}`}>
      
      {/* Stacked Translucent Layer Behind */}
      <div className="absolute -bottom-2 -right-2 w-28 sm:w-36 h-20 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md pointer-events-none z-0 transform translate-x-2 translate-y-2 p-2 hidden sm:block opacity-60">
        <div className="h-1.5 w-12 bg-blue-400/40 rounded-full mb-1.5" />
        <div className="h-1 w-20 bg-white/10 rounded-full mb-1" />
        <div className="h-1 w-14 bg-white/10 rounded-full" />
      </div>

      {/* Main Terminal Window */}
      <motion.div
        animate={{ y: [-3, 4, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-full max-w-xs sm:max-w-sm lg:w-64 xl:w-72 2xl:w-80 rounded-2xl backdrop-blur-xl bg-[#0B0F19]/90 border border-blue-500/25 p-3.5 shadow-xl hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 group"
      >
        {/* macOS Window Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300 flex items-center gap-1 font-semibold">
            <TerminalIcon className="w-2.5 h-2.5 text-blue-400" />
            terminal // bash
          </span>
        </div>

        {/* Terminal Output */}
        <div
          ref={historyContainerRef}
          className="font-mono text-[10px] sm:text-[11px] space-y-1.5 max-h-24 sm:max-h-28 overflow-y-auto pr-1 no-scrollbar select-text"
        >
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'cmd' ? (
                <div className="flex items-center gap-1.5 text-slate-200">
                  <span className="text-blue-400 font-bold">$</span>
                  <span className="truncate">{item.text}</span>
                </div>
              ) : item.type === 'error' ? (
                <div className="text-rose-400 pl-3 leading-tight text-[9px] sm:text-[10px]">{item.text}</div>
              ) : (
                <div className="text-emerald-400 font-medium pl-3 leading-tight text-[9px] sm:text-[10px]">
                  {item.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Clickable Command Chips */}
        <div className="flex items-center gap-1 pt-2 overflow-x-auto no-scrollbar">
          {['help', 'events', 'register', 'status'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 text-[9px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* CLI Input */}
        <form onSubmit={handleCommand} className="mt-2 pt-2 border-t border-white/[0.08] flex items-center gap-1.5 font-mono text-[11px]">
          <span className="text-blue-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type command..."
            className="flex-1 min-w-0 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-[10px] sm:text-[11px]"
          />
          <button
            type="submit"
            className="p-1 rounded bg-blue-600/20 text-blue-300 hover:bg-blue-600/50 hover:text-white transition-colors shrink-0 cursor-pointer"
            title="Execute command"
          >
            <Send className="w-2.5 h-2.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
