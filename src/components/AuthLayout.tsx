import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }: { children: ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 text-white p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-10">
          <Calendar size={400} />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            A sua agenda <br />
            <span className="text-indigo-200">em piloto automático.</span>
          </h2>
          <p className="text-xl text-indigo-100 max-w-md">
            Junte-se a milhares de profissionais em Portugal que já transformaram a forma como gerem os seus horários com o Sondié.
          </p>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 p-6 bg-indigo-500/30 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-indigo-600"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-sm font-medium">
              <span className="font-bold">+500 profissionais</span> em Lisboa já usam o Sondié.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-600">{subtitle}</p>
          </div>
          
          {children}
          
          <p className="mt-8 text-center text-slate-500 text-sm">
            Ao continuar, concorda com os nossos <br />
            <a href="#" className="text-indigo-600 hover:underline">Termos de Serviço</a> e <a href="#" className="text-indigo-600 hover:underline">Política de Privacidade</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
