import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { signInWithGoogle } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao entrar com Google:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement email/password login if needed
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Bem-vindo de volta" 
      subtitle="Entre na sua conta para gerir a sua agenda."
    >
      <div className="space-y-6">
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-slate-200 rounded-2xl font-semibold text-slate-700 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95 disabled:opacity-50"
        >
          <Chrome className="w-5 h-5" />
          Entrar com Google
        </button>
        
        <div className="relative flex items-center gap-4 text-slate-400 text-sm font-medium">
          <div className="flex-1 h-px bg-slate-200" />
          OU
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-slate-700">Palavra-passe</label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Esqueceu-se?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
          >
            {loading ? 'A entrar...' : 'Entrar na Conta'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <p className="text-center text-slate-600 font-medium">
          Ainda não tem conta? <Link to="/register" className="text-indigo-600 hover:underline">Registe-se grátis</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
