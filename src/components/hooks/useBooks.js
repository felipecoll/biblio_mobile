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
    const payload = {
      title: bookData.title,
      author: bookData.author,
      pages: parseInt(bookData.pages) || 0,
      status: bookData.status,
      rating: parseInt(bookData.rating) || 0,
      cover_url: bookData.coverUrl || bookData.cover_url,
      start_date: bookData.startDate || bookData.start_date || null,
      end_date: bookData.endDate || bookData.end_date || null,
      notes: bookData.notes || [] // <--- Incluimos el array de notas
    };

    try {
      if (bookData.id && typeof bookData.id === 'string' && bookData.id.length > 20) {
        const { error } = await supabase.from('books').update(payload).eq('id', bookData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('books').insert([payload]);
        if (error) throw error;
      }
      await fetchBooks();
    } catch (err) {
      console.error("Error en Supabase:", err.message);
      alert("Error al guardar: " + err.message);
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