import { Calendar, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Calendar className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Sondié
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed mb-6">
              A plataforma de agendamento online líder em Portugal. Automatize o seu negócio e foque no que realmente importa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Plataforma</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#funcionalidades" className="hover:text-indigo-600 transition-colors">Funcionalidades</a></li>
              <li><a href="#vantagens" className="hover:text-indigo-600 transition-colors">Vantagens</a></li>
              <li><a href="#setores" className="hover:text-indigo-600 transition-colors">Setores</a></li>
              <li><Link to="/register" className="hover:text-indigo-600 transition-colors">Preços</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Suporte</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Centro de Ajuda</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Comunidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">RGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 Sondié. Todos os direitos reservados. Feito com ❤️ em Lisboa.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <span>Portugal (PT)</span>
            <span>Português</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
