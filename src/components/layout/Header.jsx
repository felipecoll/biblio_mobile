import React, { useState } from 'react';
import { BookOpen, Plus, Moon, Sun, RefreshCw, LogIn, LogOut } from 'lucide-react';

const Header = ({ onOpenModal, theme, toggleTheme, onRefresh, user, onOpenAuth, onLogout }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <BookOpen className="text-white" size={20} />
          </div>
          <span className="font-black text-lg tracking-tight text-slate-800 dark:text-white">
            Biblio<span className="text-indigo-600">Mobile</span> - Dashboard
          </span>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Recarga */}
          <button 
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-all border border-transparent dark:border-slate-800"
            title="Sincronizar"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin text-indigo-600' : ''} />
          </button>

          {/* Selector Tema */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-transparent dark:border-slate-800"
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* BOTÓN SESIÓN (AL LADO DEL THEME) */}
          {user ? (
            <button 
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all border border-transparent dark:border-red-900/30"
              title={`Cerrar sesión (${user.email})`}
            >
              <LogOut size={18} />
            </button>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all border border-transparent dark:border-indigo-800/40"
              title="Iniciar sesión"
            >
              <LogIn size={18} />
            </button>
          )}

          {/* Nuevo Libro */}
          <button 
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95 text-sm ml-1"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Nuevo</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;