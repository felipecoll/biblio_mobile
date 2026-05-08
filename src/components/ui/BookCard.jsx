import React from 'react';
import { Trash2, Edit3, Star, BookOpen, CheckCircle2, Clock3, Bookmark } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete }) => {
  const statusConfig = {
    'leyendo': { icon: <BookOpen size={10} />, class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    'por leer': { icon: <Bookmark size={10} />, class: 'bg-slate-500/10 text-slate-600 dark:text-slate-400' },
    'terminado': { icon: <CheckCircle2 size={10} />, class: 'bg-green-500/10 text-green-600 dark:text-green-400' },
  };

  const currentStatus = statusConfig[book.status] || statusConfig['por leer'];

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Portada Reducida */}
      <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
        {book.coverUrl ? (
          <img src={book.coverUrl} className="w-full h-full object-cover" alt={book.title} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase truncate px-2">{book.title}</span>
          </div>
        )}

        {/* Acciones Rápidas */}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(book)} className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-sm text-indigo-600 hover:scale-110 transition-transform">
            <Edit3 size={14} />
          </button>
          <button onClick={() => onDelete(book.id)} className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-sm text-red-500 hover:scale-110 transition-transform">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Info Compacta */}
      <div className="px-1">
        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter mb-2 ${currentStatus.class}`}>
          {currentStatus.icon} {book.status}
        </div>
        
        <h3 className="text-sm font-bold text-slate-800 dark:text-white truncate mb-0.5">{book.title}</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mb-3">{book.author}</p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/50">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-700"} />
            ))}
          </div>
          <span className="text-[9px] font-bold text-slate-400">{book.pages} PP</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;