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
import { cn } from '../lib/utils';
import { useSondieImage } from '../lib/gemini-images';

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

const TestimonialCard = ({ name, role, content, image }: { name: string, role: string, content: string, image: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
  >
    <div className="flex items-center gap-4 mb-6">
      <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-50" referrerPolicy="no-referrer" />
      <div>
        <h4 className="font-bold text-slate-900">{name}</h4>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
    <p className="text-slate-600 italic leading-relaxed">"{content}"</p>
    <div className="mt-6 flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Sparkles key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  </motion.div>
);

export default function LandingPage() {
  const { imageUrl: heroImage, loading: heroLoading } = useSondieImage(
    "A high-end, cinematic 3D render of a workspace. In the foreground, a modern iPhone 15 Pro displays a sleek 'Sondié' booking app with a clean calendar and indigo accents. In the background, a studio-lit MacBook Pro shows a professional business dashboard with analytics. The environment is a minimalist Lisbon-style office with soft natural light. 8k resolution, commercial photography style."
  );
  
  const { imageUrl: dashboardImage, loading: dashboardLoading } = useSondieImage(
    "A professional lifestyle shot of a tablet screen being used by a stylish business owner in a modern Portuguese cafe. The screen shows the 'Sondié' management interface with a vibrant schedule and client list. The branding 'Sondié' is visible and elegant. Soft bokeh background, premium aesthetic."
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-8 border border-indigo-100"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/register" className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
              Criar Conta Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#demo" className="w-full sm:w-auto bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
              Ver Demonstração
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 text-slate-400 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>RGPD Compliant</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Setup em 5 min</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Users className="w-5 h-5 text-indigo-500" />
              <span>+500 Empresas</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            {heroLoading ? (
              <div className="w-full max-w-4xl h-[400px] bg-slate-100 rounded-3xl animate-pulse mx-auto flex items-center justify-center">
                <p className="text-slate-400 font-medium">A gerar visualização Sondié...</p>
              </div>
            ) : (
              <img 
                src={heroImage || "https://picsum.photos/seed/dashboard/1200/600"} 
                alt="Dashboard Sondié" 
                className="rounded-3xl shadow-2xl border border-slate-200 mx-auto"
                referrerPolicy="no-referrer"
              />
            )}
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
      <section id="vantagens" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AdvantageItem 
              percentage="80%"
              title="Menos Tempo ao Telefone"
              description="Redução drástica de perguntas sobre disponibilidade. Os clientes veem a sua agenda em tempo real."
              icon={MessageSquare}
            />
            <AdvantageItem 
              percentage="24/7"
              title="Agendamento Contínuo"
              description="O seu negócio nunca fecha. Receba marcações enquanto dorme ou atende outros clientes."
              icon={Zap}
            />
            <AdvantageItem 
              percentage="30%+"
              title="Aumento de Receita"
              description="Reduza faltas com lembretes automáticos e aumente a sua taxa de ocupação mensal."
              icon={TrendingUp}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">O que dizem os nossos parceiros</h2>
            <p className="text-slate-600 text-lg">Junte-se a centenas de profissionais que já transformaram o seu dia-a-dia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Ana Silva"
              role="Dona de Salão, Lisboa"
              content="O Sondié mudou a minha vida. Antes passava o dia no WhatsApp, agora os clientes agendam sozinhos e eu foco-me no meu trabalho."
              image="https://i.pravatar.cc/150?u=ana"
            />
            <TestimonialCard 
              name="Ricardo Santos"
              role="Barbeiro, Porto"
              content="A redução de faltas foi imediata graças aos lembretes automáticos. O investimento pagou-se na primeira semana."
              image="https://i.pravatar.cc/150?u=ricardo"
            />
            <TestimonialCard 
              name="Marta Costa"
              role="Fisioterapeuta, Coimbra"
              content="Interface super simples e intuitiva. Os meus clientes adoram a facilidade de marcar consultas a qualquer hora."
              image="https://i.pravatar.cc/150?u=marta"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Como funciona o Sondié?</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Em apenas 3 passos, transforme a gestão do seu negócio e comece a receber agendamentos automáticos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-slate-100 -z-10" />
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-3xl font-bold mb-8 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Crie o seu Perfil</h3>
              <p className="text-slate-500 leading-relaxed">Configure os seus serviços, horários e equipa em menos de 5 minutos. É simples e intuitivo.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-3xl font-bold mb-8 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Partilhe o seu Link</h3>
              <p className="text-slate-500 leading-relaxed">Coloque o seu link Sondié no Instagram, WhatsApp e Google. Os seus clientes agendam sozinhos.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-3xl font-bold mb-8 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Gerencie e Cresça</h3>
              <p className="text-slate-500 leading-relaxed">Receba notificações em tempo real, acompanhe as suas receitas e foque em atender os seus clientes.</p>
            </div>
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
                {dashboardLoading ? (
                  <div className="w-full h-[600px] bg-slate-800 rounded-[2rem] animate-pulse flex items-center justify-center">
                    <p className="text-slate-500 font-medium">A gerar dashboard Sondié...</p>
                  </div>
                ) : (
                  <img 
                    src={dashboardImage || "https://picsum.photos/seed/professional/600/800"} 
                    alt="Profissional usando Sondié" 
                    className="rounded-[2rem] shadow-2xl relative z-10 border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                )}
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
    </div>
  );
}
