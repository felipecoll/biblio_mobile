import React from 'react';
import { BookOpen, Plus, Moon, Sun } from 'lucide-react';

const Header = ({ onOpenModal, darkMode, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 shadow-md transition-colors">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <BookOpen className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">
          biblioMobile
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Nuevo Libro</span>
        </button>
      </div>
    </header>
  );
};

export default Header;