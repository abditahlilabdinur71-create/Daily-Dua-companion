
import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Calendar, CheckCircle2, Check } from 'lucide-react';
import { DailyRecord, SalahStatus } from '../types';
import { SALAH_NAMES } from '../constants';

interface TrackerProps {
  records: DailyRecord[];
  updateRecord: (record: DailyRecord) => void;
}

const Tracker: React.FC<TrackerProps> = ({ records, updateRecord }) => {
  const today = new Date().toISOString().split('T')[0];
  const [currentRecord, setCurrentRecord] = useState<DailyRecord>({
    date: today,
    salah: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false, tahajjud: false },
    dhikrCount: 0
  });

  useEffect(() => {
    const existing = records.find(r => r.date === today);
    if (existing) {
      setCurrentRecord(existing);
    }
  }, [records, today]);

  const toggleSalah = (name: keyof SalahStatus) => {
    const nextSalah = { ...currentRecord.salah, [name]: !currentRecord.salah[name] };
    const nextRecord = { ...currentRecord, salah: nextSalah };
    setCurrentRecord(nextRecord);
    updateRecord(nextRecord);
  };

  const updateDhikr = (val: number) => {
    const nextCount = Math.max(0, currentRecord.dhikrCount + val);
    const nextRecord = { ...currentRecord, dhikrCount: nextCount };
    setCurrentRecord(nextRecord);
    updateRecord(nextRecord);
  };

  const resetDhikr = () => {
    const nextRecord = { ...currentRecord, dhikrCount: 0 };
    setCurrentRecord(nextRecord);
    updateRecord(nextRecord);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Info */}
      <div className="bg-white dark:bg-stone-900 p-8 rounded-[2.5rem] border border-stone-100 dark:border-stone-800 shadow-sm flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 shadow-inner">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-[0.2em] mb-1">Today's Journey</p>
            <p className="text-xl font-serif-display italic text-stone-800 dark:text-stone-100">Spiritual Log</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-serif-display italic text-emerald-600 dark:text-emerald-400">
            {Math.round(((Object.values(currentRecord.salah).filter(Boolean).length / 6) * 100))}%
          </p>
          <p className="text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-widest">Progress</p>
        </div>
      </div>

      {/* Salah Checklist */}
      <section>
        <h3 className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] mb-6 px-2">Daily Salah</h3>
        <div className="grid gap-4">
          {SALAH_NAMES.map((name) => (
            <button
              key={name}
              onClick={() => toggleSalah(name)}
              className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 group ${
                currentRecord.salah[name]
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800'
                  : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-emerald-100 dark:hover:border-emerald-900'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                  currentRecord.salah[name] 
                    ? 'bg-emerald-600 border-emerald-600 text-white scale-110' 
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-200 dark:text-stone-700 group-hover:border-emerald-300'
                }`}>
                  {currentRecord.salah[name] ? <Check size={18} /> : null}
                </div>
                <span className={`text-sm font-bold uppercase tracking-[0.15em] transition-colors ${currentRecord.salah[name] ? 'text-emerald-900 dark:text-emerald-100' : 'text-stone-700 dark:text-stone-400'}`}>
                  {name}
                </span>
              </div>
              <span className={`text-[9px] uppercase font-bold tracking-widest transition-opacity duration-500 ${currentRecord.salah[name] ? 'opacity-40' : 'opacity-20'}`}>
                {currentRecord.salah[name] ? 'Completed' : 'Pending'}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Dhikr Counter */}
      <section className="bg-stone-900 dark:bg-stone-950 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center space-y-10">
          <div className="space-y-2">
            <h3 className="text-stone-500 text-[10px] uppercase font-bold tracking-[0.3em]">Dhikr Counter</h3>
            <p className="text-8xl font-serif-display italic tracking-tighter tabular-nums">{currentRecord.dhikrCount}</p>
          </div>

          <div className="flex items-center justify-center space-x-8">
            <button 
              onClick={() => updateDhikr(-1)}
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-all active:scale-90"
            >
              <Minus size={24} className="text-stone-400" />
            </button>
            <button 
              onClick={() => updateDhikr(1)}
              className="w-28 h-28 rounded-[2.5rem] bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-all active:scale-95 group"
            >
              <Plus size={48} className="text-stone-900 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => updateDhikr(33)}
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-all active:scale-90 font-bold text-xs text-stone-400"
            >
              +33
            </button>
          </div>

          <button 
            onClick={resetDhikr}
            className="flex items-center space-x-2 mx-auto text-[9px] uppercase font-bold tracking-[0.2em] text-stone-600 hover:text-emerald-400 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset Session</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Tracker;
