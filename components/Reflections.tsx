
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, PenLine, Save, Info, Check, Plus, Trash2, ChevronRight, BookOpen } from 'lucide-react';
import { REFLECTIONS } from '../constants';
import { DailyRecord, Reflection } from '../types';

interface ReflectionsProps {
  records: DailyRecord[];
  updateRecord: (record: DailyRecord) => void;
}

const Reflections: React.FC<ReflectionsProps> = ({ records, updateRecord }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [customPrompts, setCustomPrompts] = useState<Reflection[]>(() => {
    const saved = localStorage.getItem('custom_prompts');
    const defaults: Reflection[] = [
      {
        id: 'default_1',
        category: 'Gratitude',
        prompt: "Identify one 'luxury' you enjoyed today that many others lack. How can you use a portion of your resources (time, money, or skill) to serve someone in need?",
        explanation: 'A personal reflection point created by you.'
      }
    ];
    return saved ? JSON.parse(saved) : defaults;
  });
  const [isAddingPrompt, setIsAddingPrompt] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ prompt: '', category: 'Gratitude' });
  const predefinedCategories = ['Gratitude', 'Growth', 'Forgiveness', 'Patience', 'Trust', 'Sincerity', 'Community', 'Purpose'];
  const [selectedPromptId, setSelectedPromptId] = useState('daily');

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = records.find(r => r.date === today) || {
    date: today,
    salah: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false, tahajjud: false },
    dhikrCount: 0,
    reflection: ''
  };

  const [reflectionText, setReflectionText] = useState(todayRecord.reflection || '');
  const [isSaved, setIsSaved] = useState(false);

  const dailyPrompt = useMemo(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return REFLECTIONS[dayOfYear % REFLECTIONS.length];
  }, [today]);

  const currentPrompt = useMemo(() => {
    if (selectedPromptId === 'daily') return dailyPrompt;
    return customPrompts.find(p => p.id === selectedPromptId) || dailyPrompt;
  }, [selectedPromptId, customPrompts, dailyPrompt]);

  useEffect(() => {
    localStorage.setItem('custom_prompts', JSON.stringify(customPrompts));
  }, [customPrompts]);

  const addCustomPrompt = () => {
    if (!newPrompt.prompt.trim()) return;
    const prompt: Reflection = {
      id: `custom_${Date.now()}`,
      prompt: newPrompt.prompt,
      category: newPrompt.category,
      explanation: 'A personal reflection point created by you.'
    };
    setCustomPrompts([...customPrompts, prompt]);
    setNewPrompt({ prompt: '', category: 'Personal' });
    setIsAddingPrompt(false);
    setSelectedPromptId(prompt.id);
  };

  const deletePrompt = (id: string) => {
    setCustomPrompts(customPrompts.filter(p => p.id !== id));
    if (selectedPromptId === id) setSelectedPromptId('daily');
  };

  const handleSave = () => {
    updateRecord({
      ...todayRecord,
      reflection: reflectionText
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif-display italic text-stone-800 dark:text-stone-100">Reflections</h2>
        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
          <Sparkles size={24} />
        </div>
      </header>

      <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 border border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/20" />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-100 dark:border-emerald-800">
              {currentPrompt.category}
            </span>
            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="p-2 text-stone-300 dark:text-stone-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Info size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSelectedPromptId('daily')}
              className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg transition-all ${selectedPromptId === 'daily' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-600'}`}
            >
              Daily
            </button>
            {customPrompts.length > 0 && (
              <div className="h-3 w-[1px] bg-stone-100 dark:bg-stone-800" />
            )}
            {customPrompts.slice(0, 2).map(p => (
              <button 
                key={p.id}
                onClick={() => setSelectedPromptId(p.id)}
                className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg transition-all max-w-[60px] truncate ${selectedPromptId === p.id ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {p.category}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showExplanation ? (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <h4 className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] mb-3">Wisdom behind this</h4>
              <p className="text-sm text-stone-600 dark:text-stone-400 font-serif-elegant italic leading-relaxed">
                {currentPrompt.explanation}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-10"
            >
              <h3 className="text-2xl font-serif-display italic text-stone-800 dark:text-stone-100 leading-snug">
                "{currentPrompt.prompt}"
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative group">
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Capture your thoughts here..."
            className="w-full h-56 p-6 bg-stone-50 dark:bg-stone-800/50 rounded-[1.5rem] border border-stone-100 dark:border-stone-700 focus:border-emerald-200 dark:focus:border-emerald-800 focus:ring-4 focus:ring-emerald-500/5 text-stone-700 dark:text-stone-200 text-sm font-serif-elegant italic resize-none transition-all placeholder:text-stone-300 dark:placeholder:text-stone-600"
          />
          <div className="absolute top-6 right-6 text-stone-200 dark:text-stone-700 group-focus-within:text-emerald-500/30 transition-colors">
            <PenLine size={20} />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`mt-8 w-full py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center space-x-3 transition-all duration-500 shadow-xl ${
            isSaved 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 shadow-emerald-900/5' 
              : 'bg-stone-900 text-white hover:bg-black dark:bg-stone-800 dark:hover:bg-stone-700 shadow-stone-900/20 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSaved ? <Check size={18} /> : <Save size={18} />}
          <span>{isSaved ? 'Recorded' : 'Save Reflection'}</span>
        </button>
      </div>

      <section className="px-2 space-y-8">
        {/* Custom Prompts Library */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100">Prompt Library</h3>
            <button 
              onClick={() => setIsAddingPrompt(!isAddingPrompt)}
              className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
            >
              <Plus size={14} />
              <span>{isAddingPrompt ? 'Cancel' : 'Add Custom'}</span>
            </button>
          </div>

          <AnimatePresence>
            {isAddingPrompt && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-stone-100 dark:bg-stone-900 p-6 rounded-[2rem] border border-stone-200 dark:border-stone-800 space-y-5">
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1">Select Category</label>
                    <div className="flex flex-wrap gap-2">
                      {predefinedCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setNewPrompt({ ...newPrompt, category: cat })}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                            newPrompt.category === cat 
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                              : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-emerald-300'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Or type a custom category..."
                        value={predefinedCategories.includes(newPrompt.category) ? '' : newPrompt.category}
                        onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                        className="w-full bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/10 placeholder:text-stone-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em] ml-1">Reflection Prompt</label>
                    <textarea 
                      placeholder="What would you like to reflect on?"
                      value={newPrompt.prompt}
                      onChange={(e) => setNewPrompt({ ...newPrompt, prompt: e.target.value })}
                      className="w-full bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl px-4 py-4 text-sm font-serif-elegant italic resize-none h-28 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                  </div>
                  <button 
                    onClick={addCustomPrompt}
                    className="w-full py-3 bg-stone-900 dark:bg-emerald-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg"
                  >
                    Save to Library
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            <button 
              onClick={() => setSelectedPromptId('daily')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedPromptId === 'daily' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-stone-200'}`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-stone-50 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-400">
                  <Sparkles size={14} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Today's Daily Prompt</p>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-serif-elegant italic line-clamp-1">{dailyPrompt.prompt}</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-stone-300" />
            </button>

            {customPrompts.map(p => (
              <div 
                key={p.id}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedPromptId === p.id ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 'bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-800 hover:border-stone-200'}`}
              >
                <button 
                  onClick={() => setSelectedPromptId(p.id)}
                  className="flex-1 flex items-center space-x-3 text-left"
                >
                  <div className="w-8 h-8 bg-stone-50 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-400">
                    <BookOpen size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{p.category}</p>
                    <p className="text-xs text-stone-700 dark:text-stone-300 font-serif-elegant italic line-clamp-1">{p.prompt}</p>
                  </div>
                </button>
                <button 
                  onClick={() => deletePrompt(p.id)}
                  className="p-2 text-stone-200 hover:text-rose-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Reflections */}
        <div>
          <h3 className="text-sm font-bold text-stone-800 dark:text-stone-100 mb-4">Previous Reflections</h3>
          <div className="space-y-3">
            {records
              .filter(r => r.reflection && r.date !== today)
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 3)
              .map((record, i) => (
                <div key={i} className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm transition-colors duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-tighter">
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 italic">
                    "{record.reflection}"
                  </p>
                </div>
              ))}
            {records.filter(r => r.reflection && r.date !== today).length === 0 && (
              <p className="text-xs text-stone-400 dark:text-stone-600 italic text-center py-4">Your journey of reflection starts here.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reflections;
