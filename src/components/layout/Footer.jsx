import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-800/60 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-600/40" size={18} />
          <span className="font-black text-sm tracking-tighter text-slate-400 dark:text-slate-500 uppercase">
            Biblio<span className="text-indigo-600/60">Mobile</span>
          </span>
        </div>

        {/* Cambiamos el <p> por <div> para evitar el error de anidamiento */}
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {new Date().getFullYear()}
          </div>
          <Heart size={12} className="text-red-500/50 fill-red-500/50" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
//       <p className="text-slate-500 dark:text-slate-400 text-sm">
//         &copy; {new Date().getFullYear()} <span className="font-bold text-indigo-600">Biblio mobile</span>. 
//         <p> Hecho con ❤️ para los amantes de los libros.</p>
//       </p>
//     </footer>
//   );
// };

// export default Footer;