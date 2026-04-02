import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Chrome, User, Phone } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import { signInWithGoogle } from '../firebase';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Erro ao registar com Google:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Crie a sua conta" 
      subtitle="Comece a automatizar a sua agenda hoje mesmo."
    >
      <div className="space-y-6">
        <button 
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-slate-200 rounded-2xl font-semibold text-slate-700 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95 disabled:opacity-50"
        >
          <Chrome className="w-5 h-5" />
          Registar com Google
        </button>
        
        <div className="relative flex items-center gap-4 text-slate-400 text-sm font-medium">
          <div className="flex-1 h-px bg-slate-200" />
          OU
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Nome Completo</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="O seu nome"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Profissional</label>
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
            <label className="text-sm font-semibold text-slate-700 ml-1">Telemóvel (Portugal)</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="912 345 678"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Palavra-passe</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
          >
            {loading ? 'A criar conta...' : 'Criar Conta Grátis'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
        
        <p className="text-center text-slate-600 font-medium">
          Já tem uma conta? <Link to="/login" className="text-indigo-600 hover:underline">Entre aqui</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
