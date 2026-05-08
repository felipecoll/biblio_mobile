import React from 'react';
import { BookOpen, Plus, Moon, Sun } from 'lucide-react';

const Header = ({ onOpenModal, theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Título */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <BookOpen className="text-white" size={20} />
          </div>
          <span className="font-black text-lg tracking-tight text-slate-800 dark:text-white">
            Biblio<span className="text-indigo-600"> mobile</span> - Tus libros, tus lecturas, tu señalador!
          </span>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-transparent dark:border-slate-800"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 text-sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Nuevo Libro</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;