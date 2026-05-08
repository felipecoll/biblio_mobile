import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} <span className="font-bold text-indigo-600">Biblio mobile</span>. 
        <p> Hecho con ❤️ para los amantes de los libros.</p>
      </p>
    </footer>
  );
};

export default Footer;