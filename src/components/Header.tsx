import { Link, useLocation, useParams } from 'react-router-dom';
import { Calendar, UserCircle, Bell, LayoutDashboard, Menu, Info } from 'lucide-react';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getBusinessBySlug } from '../services/firestoreService';
import { Business } from '../types';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const location = useLocation();
  const { slug } = useParams();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isBooking = location.pathname.startsWith('/b/');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadBusiness = async () => {
      if (isBooking && slug) {
        const biz = await getBusinessBySlug(slug);
        setBusiness(biz);
      } else {
        setBusiness(null);
      }
    };
    loadBusiness();
  }, [isBooking, slug]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            {isDashboard && (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-dashboard-menu'))}
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg mr-1"
              >
                <Menu size={24} />
              </button>
            )}
            
            {isBooking && business ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
                  {business.name.charAt(0)}
                </div>
                <div>
                  <h1 className="font-bold text-slate-900 leading-none">{business.name}</h1>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium uppercase tracking-wider">{business.category || 'Serviços'}</p>
                </div>
              </div>
            ) : (
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Sondié
                </span>
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {isBooking ? (
              <div className="flex items-center gap-2 text-slate-500 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <Calendar size={16} className="text-indigo-600" />
                <span className="text-xs font-bold text-slate-700">Agendamento Online</span>
              </div>
            ) : isDashboard ? (
              <div className="flex items-center gap-2 text-slate-500">
                <LayoutDashboard size={18} />
                <span className="text-sm font-bold text-slate-900">Dashboard Administrativo</span>
              </div>
            ) : (
              <>
                <a href="/#funcionalidades" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Funcionalidades</a>
                <a href="/#vantagens" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Vantagens</a>
                <a href="/#setores" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Setores</a>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isBooking ? (
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                <Info size={20} />
              </button>
            ) : user ? (
              <div className="flex items-center gap-4">
                {!isDashboard && (
                  <Link to="/dashboard" className="text-indigo-600 font-bold hover:underline hidden sm:block">
                    Dashboard
                  </Link>
                )}
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
                <div className="flex items-center gap-3 pl-1">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 leading-none">{user.displayName?.split(' ')[0] || 'Utilizador'}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">Admin</p>
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border-2 border-white shadow-sm">
                    <UserCircle size={24} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium px-4 py-2 transition-colors">Entrar</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                  Começar Grátis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
