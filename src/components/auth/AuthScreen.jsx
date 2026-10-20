import React, { useState } from 'react';
import { BookOpen, Mail, Lock, Loader2, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase/supabase';

const AuthScreen = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        // Registro
        const { data, error } = await supabase.auth.signUp({ 
          email: email.trim(), 
          password 
        });

        if (error) throw error;

        // Si el registro no devuelve sesión activa, requiere confirmación por email
        if (data.user && !data.session) {
          alert('¡Usuario creado! Por favor revisa tu casilla de correo para confirmar el email (o desactiva "Confirm email" en el panel de Supabase).');
          setIsSignUp(false);
        } else if (data.session) {
          if (onLoginSuccess) onLoginSuccess();
        }

      } else {
        // Iniciar Sesión
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email: email.trim(), 
          password 
        });

        if (error) throw error;

        if (data.session && onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (err) {
      console.error("Error Auth Supabase:", err);
      
      // Traducimos errores comunes de Supabase al español
      if (err.message.includes('Invalid login credentials')) {
        setErrorMsg('Credenciales inválidas. Revisa tu email/contraseña o asegúrate de haber confirmado tu cuenta.');
      } else if (err.message.includes('Email not confirmed')) {
        setErrorMsg('Debes confirmar tu correo electrónico antes de ingresar.');
      } else {
        setErrorMsg(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-500">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20">
          <BookOpen className="text-white" size={28} />
        </div>
        <h1 className="font-black text-2xl sm:text-3xl tracking-tight text-slate-800 dark:text-white">
          biblio<span className="text-indigo-600">Mobile</span>
        </h1>
      </div>

      {/* Card Formulario */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 transition-all">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
            {isSignUp ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-xs font-semibold text-slate-400">
            {isSignUp ? 'Organiza tu biblioteca en la nube' : 'Ingresa tus credenciales para acceder'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white border border-transparent dark:border-slate-800 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password"
              required
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white border border-transparent dark:border-slate-800 transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : isSignUp ? (
              <>
                {/* <UserPlus size={18} /> Registrarme */}
              </>
            ) : (
              <>
                <LogIn size={18} /> Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;