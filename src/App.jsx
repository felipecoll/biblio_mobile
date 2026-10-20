import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from './lib/supabase/supabase';
import { useTheme } from './components/hooks/useTheme';
import { useBooks } from './components/hooks/useBooks';

// Componentes de Layout
import Header from './components/layout/Header';
import StatsGrid from './components/layout/StatsGrid';
import Footer from './components/layout/Footer';

// Componentes de UI
import SearchBar from './components/ui/SearchBar';
import BookCard from './components/ui/BookCard';
import BookModal from './components/ui/BookModal';
import AuthModal from './components/ui/AuthModal';
import AuthScreen from './components/auth/AuthScreen';
import { Loader2, BookX } from 'lucide-react';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { books, loading, saveBook, deleteBook, fetchBooks } = useBooks();

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // Escuchar estado de sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setCheckingAuth(false);
      fetchBooks();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Filtrado de libros
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'todos' || book.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [books, searchTerm, filterStatus]);

  // Cálculo de estadísticas
  const stats = useMemo(() => {
    const total = books.length;
    const finished = books.filter(b => b.status === 'terminado').length;
    const reading = books.filter(b => b.status === 'leyendo').length;
    const pending = books.filter(b => b.status === 'por leer').length;
    
    const totalPagesRead = books
      .filter(b => b.status === 'terminado')
      .reduce((acc, b) => acc + (Number(b.pages) || 0), 0);

    const ratedBooks = books.filter(b => b.rating > 0);
    const avgRating = ratedBooks.length 
      ? (ratedBooks.reduce((acc, b) => acc + Number(b.rating), 0) / ratedBooks.length).toFixed(1) 
      : "0.0";

    return {
      total,
      read: reading,
      readPct: total ? Math.round((reading / total) * 100) : 0,
      finished,
      finishedPct: total ? Math.round((finished / total) * 100) : 0,
      pending,
      pendingPct: total ? Math.round((pending / total) * 100) : 0,
      totalPagesRead,
      avgRating
    };
  }, [books]);

  const handleOpenModal = (book = null) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBook(null);
    setIsModalOpen(false);
  };

  const onSave = async (data) => {
    await saveBook(data);
    handleCloseModal();
  };

  // Spinner inicial mientras verifica la sesión
  if (checkingAuth || loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-bold animate-pulse uppercase text-xs tracking-[0.2em]">
          Cargando Biblioteca...
        </p>
      </div>
    );
  }

  // SI NO HAY USUARIO: Muestra únicamente la pantalla de Login completa
  if (!user) {
    return <AuthScreen onLoginSuccess={() => fetchBooks()} />;
  }

  // SI HAY USUARIO LOGUEADO: Muestra el Dashboard completo
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      <Header 
        onOpenModal={() => handleOpenModal()} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onRefresh={fetchBooks}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
        
        <StatsGrid stats={stats} />
        
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onEdit={handleOpenModal} 
                onDelete={deleteBook}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all">
            <BookX className="text-slate-300 dark:text-slate-700 mb-4" size={48} />
            <p className="text-lg font-bold text-slate-400 dark:text-slate-600">No se encontraron libros</p>
            <button 
              onClick={() => handleOpenModal()}
              className="mt-2 text-indigo-600 font-black hover:underline uppercase text-xs tracking-widest"
            >
              Cargar nuevo ejemplar
            </button>
          </div>
        )}
      </main>

      <Footer />

      <BookModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={onSave}
        editingBook={editingBook}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}

export default App;