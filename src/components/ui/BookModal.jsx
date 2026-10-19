import React, { useState, useEffect } from 'react';
import { X, Star, Loader2, ImageIcon, Search, RotateCcw, Plus, Trash2, StickyNote } from 'lucide-react';

const BookModal = ({ isOpen, onClose, onSave, editingBook }) => {
  const initialFormState = {
    title: '', author: '', pages: '', status: 'por leer',
    rating: 0, coverUrl: '', startDate: '', endDate: '', notes: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newNote, setNewNote] = useState('');
  const [loadingCover, setLoadingCover] = useState(false);

  useEffect(() => {
    if (editingBook) {
      setFormData({
        ...editingBook,
        coverUrl: editingBook.cover_url || editingBook.coverUrl || '',
        startDate: editingBook.start_date || editingBook.startDate || '',
        endDate: editingBook.end_date || editingBook.endDate || '',
        notes: editingBook.notes || []
      });
    } else {
      setFormData(initialFormState);
    }
    setNewNote('');
  }, [editingBook, isOpen]);

  const handleReset = () => {
    if (window.confirm('¿Deseas limpiar todos los campos?')) {
      setFormData(initialFormState);
      setNewNote('');
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setFormData(prev => ({
      ...prev,
      notes: [...(prev.notes || []), newNote.trim()]
    }));
    setNewNote('');
  };

  const handleRemoveNote = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      notes: prev.notes.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const fetchCover = async () => {
    if (!formData.title) {
      alert("Por favor, ingresa un título para buscar la portada.");
      return;
    }
    setLoadingCover(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(formData.title)}&limit=1`);
      const data = await res.json();
      if (data.docs?.[0]?.cover_i) {
        const url = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-M.jpg`;
        setFormData(prev => ({ ...prev, coverUrl: url }));
      } else {
        alert("No se encontró una portada para este título.");
      }
    } catch (error) {
      console.error("Error al buscar portada", error);
    } finally {
      setLoadingCover(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b dark:border-slate-800 flex-shrink-0">
          <h2 className="text-lg font-bold dark:text-white">
            {editingBook ? 'Editar Libro' : 'Nuevo Libro'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <form className="p-5 space-y-4 overflow-y-auto flex-1" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          
          <div className="flex gap-4 items-start">
            <div className="flex flex-col gap-2">
              <div className="w-20 h-28 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-inner">
                {loadingCover ? (
                  <Loader2 className="animate-spin text-indigo-500" size={20} />
                ) : formData.coverUrl ? (
                  <img src={formData.coverUrl} className="w-full h-full object-cover" alt="portada" />
                ) : (
                  <ImageIcon className="text-slate-300 dark:text-slate-600" size={28} />
                )}
              </div>
              <button 
                type="button"
                onClick={fetchCover}
                className="flex items-center justify-center gap-1 text-[10px] font-black uppercase bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 transition-all"
              >
                <Search size={12} /> Buscar
              </button>
            </div>

            <div className="flex-1 space-y-3">
              <input 
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border-none p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                placeholder="Título del libro"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <input 
                required
                className="w-full bg-slate-50 dark:bg-slate-800 border-none p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                placeholder="Autor"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder="Págs"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                  value={formData.pages}
                  onChange={(e) => setFormData({...formData, pages: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={handleReset}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-xl transition-all"
                  title="Resetear formulario"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block ml-1">Estado</label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl outline-none dark:text-white text-sm border-none ring-0"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="por leer">Por leer</option>
                <option value="leyendo">Leyendo</option>
                <option value="terminado">Terminado</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block ml-1">Calificación</label>
              <div className="flex gap-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className={`transition-all ${formData.rating >= star ? 'text-yellow-400 scale-110' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'}`}
                  >
                    <Star size={18} fill={formData.rating >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block ml-1">Fecha Inicio</label>
              <input 
                type="date"
                className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl outline-none dark:text-white text-sm"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block ml-1">Fecha Fin</label>
              <input 
                type="date"
                className="w-full bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl outline-none dark:text-white text-sm"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>

          {/* SECCIÓN DE NOTAS Y CITAS */}
          <div className="pt-2 border-t dark:border-slate-800 space-y-2">
            <label className="text-[10px] font-bold uppercase text-slate-400 block ml-1 flex items-center gap-1">
              <StickyNote size={12} /> Notas y Citas Destacadas
            </label>

            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Escribe una nota o frase reflexiva..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border-none p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddNote(); } }}
              />
              <button 
                type="button"
                onClick={handleAddNote}
                className="px-3 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-all font-bold text-xs flex items-center gap-1"
              >
                <Plus size={16} /> Agregar
              </button>
            </div>

            {/* Listado de Notas */}
            {formData.notes && formData.notes.length > 0 && (
              <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                {formData.notes.map((note, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex-1 pr-2 italic">"{note}"</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveNote(idx)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] mt-4 shadow-lg shadow-indigo-500/20 flex-shrink-0"
          >
            {editingBook ? 'Actualizar Registro' : 'Confirmar y Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;