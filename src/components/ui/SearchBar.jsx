import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por título o autor..." 
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all shadow-sm"
        />
      </div>
      
      <div className="sm:w-64">
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 rounded-2xl outline-none text-slate-600 dark:text-slate-300 shadow-sm cursor-pointer hover:border-indigo-400 transition-colors appearance-none"
        >
          <option value="todos">Todos los libros</option>
          <option value="leyendo">Leyendo</option>
          <option value="por leer">Por leer</option>
          <option value="terminado">Terminados</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;