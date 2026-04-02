import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  Bell, 
  BarChart3, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight,
  Scissors,
  Stethoscope,
  Sparkles,
  Paintbrush,
  Zap,
  Dumbbell,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any, title: string, description: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
  >
    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const AdvantageItem = ({ percentage, title, description, icon: Icon }: { percentage: string, title: string, description: string, icon: any }) => (
  <div className="flex flex-col items-center text-center p-8 bg-indigo-600 rounded-3xl text-white relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={120} />
    </div>
    <span className="text-5xl font-bold mb-2">{percentage}</span>
    <h4 className="text-xl font-semibold mb-4">{title}</h4>
    <p className="text-indigo-100 text-sm leading-relaxed">{description}</p>
  </div>
);

const CategoryCard = ({ icon: Icon, title }: { icon: any, title: string }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-default">
    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
      <Icon className="w-5 h-5 text-indigo-600" />
    </div>
    <span className="font-medium text-slate-700">{title}</span>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Calendar className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Sondié
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#funcionalidades" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Funcionalidades</a>
              <a href="#vantagens" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Vantagens</a>
              <a href="#setores" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Setores</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium px-4 py-2 transition-colors">Entrar</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                Começar Grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>O Futuro do Agendamento em Portugal</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Automatize a sua agenda, <br />
            <span className="text-indigo-600">reduza faltas</span> e cresça.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            O Sondié permite que os seus clientes agendem sozinhos — de forma simples, profissional e 24/7. 
            Menos tempo ao telefone, mais tempo para o que importa.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
              Criar Conta Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#demo" className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
              Ver Demonstração
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <img 
              src="https://picsum.photos/seed/dashboard/1200/600" 
              alt="Dashboard Sondié" 
              className="rounded-3xl shadow-2xl border border-slate-200 mx-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tudo o que precisa para gerir o seu negócio</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Uma plataforma completa, pensada para a realidade do mercado português.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Calendar}
              title="Link de Agendamento"
              description="Partilhe o seu link personalizado e deixe os clientes escolherem os melhores horários sozinhos."
              delay={0.1}
            />
            <FeatureCard 
              icon={Clock}
              title="Painel de Agendamentos"
              description="Agenda digital organizada para agendar, organizar e gerir os seus horários de forma eficiente."
              delay={0.2}
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Relatórios de Receita"
              description="Controlo financeiro fácil. Acompanhe faturamento, custos e lucros com relatórios detalhados."
              delay={0.3}
            />
            <FeatureCard 
              icon={Users}
              title="Gestão de Funcionários"
              description="Controle comissões, horários e performance da sua equipa de forma totalmente automatizada."
              delay={0.4}
            />
            <FeatureCard 
              icon={Bell}
              title="Alertas Automáticos"
              description="Notificações via WhatsApp e Email para que os seus clientes nunca se esqueçam de um agendamento."
              delay={0.5}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Visão Geral do Negócio"
              description="Estatísticas avançadas para acompanhar o desempenho e tomar decisões baseadas em dados."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="vantagens" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AdvantageItem 
              percentage="80%"
              title="Menos Tempo Respondendo"
              description="Redução drástica de perguntas sobre disponibilidade. Os clientes veem a sua agenda em tempo real."
              icon={MessageSquare}
            />
            <AdvantageItem 
              percentage="24/7"
              title="WhatsApp Inteligente"
              description="Atendimento automático e contínuo. Programe o envio do link de agendamento automaticamente."
              icon={Zap}
            />
            <AdvantageItem 
              percentage="30%+"
              title="Mais Tempo para Crescer"
              description="Aumento de produtividade ao automatizar tarefas repetitivas e focar no que realmente importa."
              icon={TrendingUp}
            />
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section id="setores" className="py-24 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Soluções sob medida para o seu negócio</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                O Sondié foi criado para profissionais e empresas que querem automatizar agendamentos, 
                melhorar o atendimento e aumentar as receitas em Lisboa e em todo o país.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CategoryCard icon={Stethoscope} title="Clínicas e Consultórios" />
                <CategoryCard icon={Scissors} title="Cabeleireiros e Barbearias" />
                <CategoryCard icon={Sparkles} title="Esteticistas e Spas" />
                <CategoryCard icon={Paintbrush} title="Nail Designers e Manicures" />
                <CategoryCard icon={Zap} title="Depiladoras e Laser" />
                <CategoryCard icon={CheckCircle2} title="Fisioterapeutas e Terapeutas" />
                <CategoryCard icon={Dumbbell} title="Personal Trainers" />
                <CategoryCard icon={Wrench} title="Oficinas e Prestadores" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-[2rem] blur-2xl" />
                <img 
                  src="https://picsum.photos/seed/professional/600/800" 
                  alt="Profissional usando Sondié" 
                  className="rounded-[2rem] shadow-2xl relative z-10 border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Calendar size={200} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Pronto para transformar a sua agenda?</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto relative z-10">
            Junte-se a centenas de profissionais que já automatizaram o seu negócio com o Sondié.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/register" className="w-full sm:w-auto bg-white text-indigo-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-50 transition-all shadow-xl">
              Começar Agora - É Grátis
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-indigo-500/30 text-white border border-white/20 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-indigo-500/40 transition-all">
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <Calendar className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900">Sondié</span>
            </div>
            <div className="flex gap-8 text-slate-500 font-medium">
              <a href="#" className="hover:text-indigo-600 transition-colors">Termos</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contacto</a>
            </div>
            <p className="text-slate-400 text-sm">
              © 2026 Sondié. Feito com ❤️ em Lisboa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
