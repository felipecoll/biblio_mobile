import React, { useState, useMemo } from 'react';
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
import { Loader2, BookX } from 'lucide-react';

function App() {
  // 1. Hooks de Estado y Datos
  const { theme, toggleTheme } = useTheme();
  const { books, loading, saveBook, deleteBook, fetchBooks } = useBooks();
  
  // 2. Estados de UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // 3. Lógica de Filtrado de Libros
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'todos' || book.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    });
  }, [books, searchTerm, filterStatus]);

  // 4. Cálculo de Estadísticas para el Dashboard
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
      ? (ratedBooks.reduce((acc, b) => acc + b.rating, 0) / ratedBooks.length).toFixed(1) 
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

  // 5. Manejadores de acciones
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

  // 6. Renderizado Condicional de Carga
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-bold animate-pulse uppercase text-xs tracking-[0.2em]">Conectando Biblioteca...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* Header con Ancho Completo */}
      <Header 
        onOpenModal={() => handleOpenModal()} 
        theme={theme} 
        toggleTheme={toggleTheme}
        onRefresh={fetchBooks} 
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Dashboard de Estadísticas */}
        <StatsGrid stats={stats} />
        
        {/* Barra de Búsqueda y Filtros de Ancho Completo */}
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Grid de Resultados */}
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

      {/* Footer con Ancho Completo */}
      <Footer />

      {/* Modal de Gestión de Libros */}
      <BookModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={onSave}
        editingBook={editingBook}
      />
    </div>
  );
}

export default App;

// import React, { useState, useMemo } from 'react';
// import { useTheme } from './components/hooks/useTheme';

// // Layout
// import Header from './components/layout/Header';
// import StatsGrid from './components/layout/StatsGrid';
// import Footer from './components/layout/Footer';

// // UI
// import SearchBar from './components/ui/SearchBar';
// import BookCard from './components/ui/BookCard';
// import BookModal from './components/ui/BookModal';

// const INITIAL_BOOKS = [
//   { 
//     id: 1, 
//     title: 'El Resplandor', 
//     author: 'Stephen King', 
//     pages: 600, 
//     status: 'terminado', 
//     rating: 5, 
//     coverUrl: 'https://covers.openlibrary.org/b/id/12818862-L.jpg' 
//   },
//   { 
//     id: 2, 
//     title: 'Hábitos Atómicos', 
//     author: 'James Clear', 
//     pages: 320, 
//     status: 'leyendo', 
//     rating: 4, 
//     coverUrl: 'https://covers.openlibrary.org/b/id/12884431-L.jpg' 
//   }
// ];

// function App() {
//   const { theme, toggleTheme } = useTheme();
//   const [books, setBooks] = useState(INITIAL_BOOKS);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('todos');

//   // Filtros de búsqueda
//   const filteredBooks = useMemo(() => {
//     return books.filter(book => {
//       const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             book.author.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFilter = filterStatus === 'todos' || book.status === filterStatus;
//       return matchesSearch && matchesFilter;
//     });
//   }, [books, searchTerm, filterStatus]);

//   // Estadísticas dinámicas
//   const stats = useMemo(() => {
//     const total = books.length;
//     const finished = books.filter(b => b.status === 'terminado').length;
//     const reading = books.filter(b => b.status === 'leyendo').length;
//     const pending = books.filter(b => b.status === 'proximo' || b.status === 'sin leer').length;
    
//     return {
//       total,
//       read: reading,
//       readPct: total ? Math.round((reading / total) * 100) : 0,
//       finished,
//       finishedPct: total ? Math.round((finished / total) * 100) : 0,
//       pending,
//       pendingPct: total ? Math.round((pending / total) * 100) : 0,
//       totalPagesRead: books.filter(b => b.status === 'terminado').reduce((acc, b) => acc + Number(b.pages), 0),
//       avgRating: books.filter(b => b.rating > 0).length 
//         ? (books.reduce((acc, b) => acc + b.rating, 0) / books.filter(b => b.rating > 0).length).toFixed(1) 
//         : "0.0"
//     };
//   }, [books]);

//   // Handlers
//   const handleSaveBook = (bookData) => {
//     if (editingBook) {
//       setBooks(books.map(b => b.id === editingBook.id ? { ...bookData, id: b.id } : b));
//     } else {
//       setBooks([...books, { ...bookData, id: Date.now() }]);
//     }
//     setIsModalOpen(false);
//     setEditingBook(null);
//   };

//   const handleDelete = (id) => {
//     if(confirm("¿Eliminar este libro de tu colección?")) {
//       setBooks(books.filter(b => b.id !== id));
//     }
//   };

//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
//       <Header 
//         onOpenModal={() => { setEditingBook(null); setIsModalOpen(true); }} 
//         theme={theme} 
//         toggleTheme={toggleTheme} 
//       />
      
//       <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//         <StatsGrid stats={stats} />
        
//         <div className="mb-10">
//           <SearchBar 
//             searchTerm={searchTerm} 
//             setSearchTerm={setSearchTerm} 
//             filterStatus={filterStatus}
//             setFilterStatus={setFilterStatus}
//           />
//         </div>

//         {/* Grid con animación simple de Tailwind */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredBooks.map(book => (
//             <BookCard 
//               key={book.id} 
//               book={book} 
//               onEdit={handleEdit} 
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>

//         {filteredBooks.length === 0 && (
//           <div className="text-center py-20 opacity-50">
//             <p className="text-xl italic">No hay libros que coincidan con tu búsqueda...</p>
//           </div>
//         )}

//         <Footer />
//       </main>

//       {/* Modal de Carga/Edición */}
//       <BookModal 
//         isOpen={isModalOpen} 
//         onClose={() => { setIsModalOpen(false); setEditingBook(null); }} 
//         onSave={handleSaveBook}
//         editingBook={editingBook}
//       />
//     </div>
//   );
// }

// export default App;
