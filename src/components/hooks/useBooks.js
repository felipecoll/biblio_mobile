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
    const { data: { user } } = await supabase.auth.getUser();

    const payload = {
  user_id: user ? user.id : null, // Asocia el libro al usuario actual
  title: bookData.title,
  author: bookData.author,
  pages: parseInt(bookData.pages) || 0,
  status: bookData.status,
  rating: parseInt(bookData.rating) || 0,
  cover_url: bookData.coverUrl || bookData.cover_url,
  start_date: bookData.startDate || bookData.start_date || null,
  end_date: bookData.endDate || bookData.end_date || null,
  notes: bookData.notes || []
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

