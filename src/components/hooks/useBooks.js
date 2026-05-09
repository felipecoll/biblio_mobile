import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase/supabase';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setBooks(data);
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const saveBook = async (bookData) => {
    // 1. Mapeamos los nombres de los campos de React a Supabase (PostgreSQL)
    const payload = {
      title: bookData.title,
      author: bookData.author,
      pages: parseInt(bookData.pages) || 0,
      status: bookData.status,
      rating: parseInt(bookData.rating) || 0,
      cover_url: bookData.coverUrl, // <--- Aquí estaba el error 400 casi seguro
      start_date: bookData.startDate || null,
      end_date: bookData.endDate || null
    };

    try {
      if (bookData.id && typeof bookData.id === 'string' && bookData.id.length > 20) {
        // UPDATE
        const { error } = await supabase.from('books').update(payload).eq('id', bookData.id);
        if (error) throw error;
      } else {
        // INSERT
        const { error } = await supabase.from('books').insert([payload]);
        if (error) throw error;
      }
      await fetchBooks();
    } catch (err) {
      console.error("Error real de Supabase:", err.message);
      alert("Error: " + err.message);
    }
  };

  const deleteBook = async (id) => {
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (!error) fetchBooks();
  };

  return { books, loading, saveBook, deleteBook, fetchBooks };
};

// import { useState, useEffect } from 'react';
// import { supabase } from '../../lib/supabase/supabase';

// export const useBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 1. Cargar libros al iniciar
//   const fetchBooks = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('books')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (!error) setBooks(data);
//     setLoading(false);
//   };

//   useEffect(() => { fetchBooks(); }, []);

//   // 2. Insertar o Actualizar
//   const saveBook = async (bookData) => {
//     const { id, ...rest } = bookData;
    
//     if (id && isNaN(id)) { // Si tiene un UUID de Supabase, actualiza
//       await supabase.from('books').update(rest).eq('id', id);
//     } else { // Si es nuevo (o id temporal de Date.now)
//       await supabase.from('books').insert([rest]);
//     }
//     fetchBooks();
//   };

//   // 3. Eliminar
//   const deleteBook = async (id) => {
//     await supabase.from('books').delete().eq('id', id);
//     fetchBooks();
//   };

//   return { books, loading, saveBook, deleteBook };
// };