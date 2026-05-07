import React from 'react';
import { Book, CheckCircle, Clock, BarChart3, BookOpenText, Star } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, percentage }) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 dark:text-white">{value}</h3>
        {percentage !== undefined && (
          <span className="text-xs text-indigo-500 font-semibold">{percentage}% del total</span>
        )}
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="text-white" size={20} />
      </div>
    </div>
  </div>
);

const StatsGrid = ({ stats }) => {
  return (
    <div className="space-y-4 mb-8">
      {/* 4 Cards Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Libros" value={stats.total} icon={Book} color="bg-blue-500" />
        <StatCard title="Leídos" value={stats.read} icon={CheckCircle} color="bg-green-500" percentage={stats.readPct} />
        <StatCard title="Terminados" value={stats.finished} icon={BarChart3} color="bg-purple-500" percentage={stats.finishedPct} />
        <StatCard title="Por Leer" value={stats.pending} icon={Clock} color="bg-orange-500" percentage={stats.pendingPct} />
      </div>

      {/* 2 Cards Inferiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-pink-500 rounded-full text-white">
            <BookOpenText size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Páginas Totales Leídas</p>
            <h3 className="text-2xl font-bold dark:text-white">{stats.totalPagesRead.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-yellow-500 rounded-full text-white">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Calificación Promedio</p>
            <h3 className="text-2xl font-bold dark:text-white">{stats.avgRating} / 5.0</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;