
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, BookOpen, CheckCircle, User, Heart, Sparkles, Sun, Moon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DuaLibrary from './components/DuaLibrary';
import Tracker from './components/Tracker';
import Reflections from './components/Reflections';
import { DailyRecord } from './types';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('dua_bookmarks');
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    const savedRecords = localStorage.getItem('daily_records');
    if (savedRecords) setDailyRecords(JSON.parse(savedRecords));
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      localStorage.setItem('dua_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const updateRecord = (record: DailyRecord) => {
    setDailyRecords(prev => {
      const index = prev.findIndex(r => r.date === record.date);
      let next;
      if (index > -1) {
        next = [...prev];
        next[index] = record;
      } else {
        next = [...prev, record];
      }
      localStorage.setItem('daily_records', JSON.stringify(next));
      return next;
    });
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <button
        onClick={() => navigate(to)}
        className={`flex flex-col items-center justify-center space-y-1.5 w-full py-3 transition-all duration-500 relative ${
          isActive ? 'text-stone-900 dark:text-emerald-400' : 'text-stone-300 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-400'
        }`}
      >
        <Icon size={isActive ? 22 : 20} className={`transition-all duration-500 ${isActive ? 'scale-110' : ''}`} />
        <span className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
        {isActive && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -top-1 w-1 h-1 bg-emerald-500 rounded-full"
          />
        )}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 shadow-2xl relative border-x border-stone-100 dark:border-stone-800 transition-colors duration-300">
      {/* Header */}
      <header className="px-8 pt-10 pb-6 bg-white dark:bg-stone-900 sticky top-0 z-30 flex justify-between items-center border-b border-stone-100 dark:border-stone-800 transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-serif-display italic text-stone-900 dark:text-emerald-400 leading-none mb-1">Companion</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-xl text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center justify-center border border-stone-100 dark:border-stone-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-xl text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center justify-center border border-stone-100 dark:border-stone-700">
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto px-6 pt-6">
        <Routes>
          <Route path="/" element={<Dashboard records={dailyRecords} />} />
          <Route path="/duas" element={<DuaLibrary bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
          <Route path="/tracker" element={<Tracker records={dailyRecords} updateRecord={updateRecord} />} />
          <Route path="/reflect" element={<Reflections records={dailyRecords} updateRecord={updateRecord} />} />
        </Routes>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-t border-stone-100 dark:border-stone-800 flex justify-around items-center px-4 py-2 z-40 transition-colors duration-300">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/duas" icon={BookOpen} label="Duas" />
        <NavItem to="/tracker" icon={CheckCircle} label="Track" />
        <NavItem to="/reflect" icon={Sparkles} label="Reflect" />
      </nav>
    </div>
  );
};

export default App;
