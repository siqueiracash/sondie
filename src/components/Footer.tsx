import { Calendar, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Sondié</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8">
              A plataforma de agendamento online líder em Portugal. Automatize o seu negócio e foque no que realmente importa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-8 text-lg">Plataforma</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#funcionalidades" className="hover:text-indigo-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#vantagens" className="hover:text-indigo-400 transition-colors">Vantagens</a></li>
              <li><a href="#setores" className="hover:text-indigo-400 transition-colors">Setores</a></li>
              <li><Link to="/register" className="hover:text-indigo-400 transition-colors">Preços</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 text-lg">Suporte</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Centro de Ajuda</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Comunidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 text-lg">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">RGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Sondié. Todos os direitos reservados. Feito com ❤️ em Lisboa.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Sistemas Online
            </span>
            <span>Portugal (PT)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
