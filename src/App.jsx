import React, { useState, useMemo } from 'react';
import { useTheme } from './components/hooks/useTheme';

// Layout
import Header from './components/layout/Header';
import StatsGrid from './components/layout/StatsGrid';
import Footer from './components/layout/Footer';

// UI
import SearchBar from './components/ui/SearchBar';
import BookCard from './components/ui/BookCard';
import BookModal from './components/ui/BookModal';

const INITIAL_BOOKS = [
  { 
    id: 1, 
    title: 'El Resplandor', 
    author: 'Stephen King', 
    pages: 600, 
    status: 'terminado', 
    rating: 5, 
    coverUrl: 'https://covers.openlibrary.org/b/id/12818862-L.jpg' 
  },
  { 
    id: 2, 
    title: 'Hábitos Atómicos', 
    author: 'James Clear', 
    pages: 320, 
    status: 'leyendo', 
    rating: 4, 
    coverUrl: 'https://covers.openlibrary.org/b/id/12884431-L.jpg' 
  }
];

function App() {
  const { theme, toggleTheme } = useTheme();
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // Filtros de búsqueda
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'todos' || book.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [books, searchTerm, filterStatus]);

  // Estadísticas dinámicas
  const stats = useMemo(() => {
    const total = books.length;
    const finished = books.filter(b => b.status === 'terminado').length;
    const reading = books.filter(b => b.status === 'leyendo').length;
    const pending = books.filter(b => b.status === 'proximo' || b.status === 'sin leer').length;
    
    return {
      total,
      read: reading,
      readPct: total ? Math.round((reading / total) * 100) : 0,
      finished,
      finishedPct: total ? Math.round((finished / total) * 100) : 0,
      pending,
      pendingPct: total ? Math.round((pending / total) * 100) : 0,
      totalPagesRead: books.filter(b => b.status === 'terminado').reduce((acc, b) => acc + Number(b.pages), 0),
      avgRating: books.filter(b => b.rating > 0).length 
        ? (books.reduce((acc, b) => acc + b.rating, 0) / books.filter(b => b.rating > 0).length).toFixed(1) 
        : "0.0"
    };
  }, [books]);

  // Handlers
  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? { ...bookData, id: b.id } : b));
    } else {
      setBooks([...books, { ...bookData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const handleDelete = (id) => {
    if(confirm("¿Eliminar este libro de tu colección?")) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      <Header 
        onOpenModal={() => { setEditingBook(null); setIsModalOpen(true); }} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <StatsGrid stats={stats} />
        
        <div className="mb-10">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        {/* Grid con animación simple de Tailwind */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl italic">No hay libros que coincidan con tu búsqueda...</p>
          </div>
        )}

        <Footer />
      </main>

      {/* Modal de Carga/Edición */}
      <BookModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingBook(null); }} 
        onSave={handleSaveBook}
        editingBook={editingBook}
      />
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
