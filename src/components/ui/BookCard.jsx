import React from 'react';
import { Trash2, Edit3, Star, BookOpen, CheckCircle2, Bookmark, Calendar } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete }) => {
  // Mapeo de estados con colores y texturas sutiles
  const statusConfig = {
    'leyendo': { 
      icon: <BookOpen size={12} />, 
      class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50' 
    },
    'por leer': { 
      icon: <Bookmark size={12} />, 
      class: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/50' 
    },
    'terminado': { 
      icon: <CheckCircle2 size={12} />, 
      class: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-200/50 dark:border-green-800/50' 
    },
  };

  // Soporte para ambos formatos: Supabase (cover_url) y Formulario (coverUrl)
  const coverImg = book.cover_url || book.coverUrl;
  const currentStatus = statusConfig[book.status] || statusConfig['por leer'];

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
      
      {/* Contenedor de Imagen (Altura Reducida) */}
      <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800 shadow-inner">
        {coverImg ? (
          <img 
            src={coverImg} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            alt={book.title} 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-slate-200/50 to-purple-500/10 dark:from-indigo-900/20 dark:to-slate-800 flex items-center justify-center p-4 text-center">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter line-clamp-3">
              {book.title}
            </span>
          </div>
        )}

        {/* Acciones Flotantes (Hover) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button 
            onClick={() => onEdit(book)}
            className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <Edit3 size={14} />
          </button>
          <button 
            onClick={() => onDelete(book.id)}
            className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Badge de Estado sobre imagen */}
        <div className="absolute bottom-2 left-2">
          <div className={`flex items-center gap-1.5 backdrop-blur-md border px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${currentStatus.class}`}>
            {currentStatus.icon}
            {book.status}
          </div>
        </div>
      </div>

      {/* Información del Libro */}
      <div className="px-1 flex flex-col flex-1">
        <h3 className="text-sm font-black text-slate-800 dark:text-white leading-tight line-clamp-1 mb-0.5">
          {book.title}
        </h3>
        <p className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400/80 uppercase tracking-wide mb-3 truncate">
          {book.author}
        </p>

        {/* Metadatos (Fechas si existen) */}
        {(book.start_date || book.startDate) && (
          <div className="flex items-center gap-1 text-[9px] text-slate-400 mb-3">
            <Calendar size={10} />
            <span>{book.start_date || book.startDate}</span>
          </div>
        )}

        {/* Footer de la Card */}
        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
          {/* Rating */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                className={i < (book.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-700"} 
              />
            ))}
          </div>

          {/* Páginas */}
          <div className="bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md">
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400">
              {book.pages || 0} PP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;