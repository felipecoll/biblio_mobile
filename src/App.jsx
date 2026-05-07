import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import StatsGrid from './components/layout/StatsGrid';
//import SearchBar from './components/ui/SearchBar';
// Importaremos BookCard y BookModal en el siguiente paso

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState([]); // Aquí vivirán los datos de Supabase pronto

  // Mock de estadísticas para visualización inicial
  const stats = {
    total: 12,
    read: 4,
    readPct: 33,
    finished: 3,
    finishedPct: 25,
    pending: 5,
    pendingPct: 42,
    totalPagesRead: 1450,
    avgRating: 4.2
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header 
        onOpenModal={() => setIsModalOpen(true)} 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <StatsGrid stats={stats} />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* <SearchBar /> */}
          {/* Aquí irá el botón de filtro que pediste */}
        </div>

        {/* Grid de Cards de Libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Mapeo de libros próximamente */}
          <div className="text-center col-span-full py-20 text-slate-400">
            Cargando biblioteca...
          </div>
        </div>
      </main>

      {/* El Footer irá aquí */}
    </div>
  );
}

export default App;
// import { useState } from 'react'

// import './App.css'

// function App() {
  
//   return (
//     <>
     
//     </>
//   )
// }

// export default App
