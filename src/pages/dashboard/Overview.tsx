import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { getBusinesses, getAppointments } from '../../services/firestoreService';
import { Appointment, Business } from '../../types';
import { auth } from '../../firebase';
import CreateBusiness from '../../components/CreateBusiness';

const data = [
  { name: 'Seg', revenue: 400, appointments: 24 },
  { name: 'Ter', revenue: 300, appointments: 18 },
  { name: 'Qua', revenue: 600, appointments: 32 },
  { name: 'Qui', revenue: 800, appointments: 45 },
  { name: 'Sex', revenue: 500, appointments: 28 },
  { name: 'Sáb', revenue: 900, appointments: 52 },
  { name: 'Dom', revenue: 200, appointments: 12 },
];

const StatCard = ({ title, value, change, trend, icon: Icon }: { title: string, value: string, change: string, trend: 'up' | 'down', icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600">
        <Icon size={24} />
      </div>
      <div className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
        trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
  </motion.div>
);

export default function Overview() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const businesses = await getBusinesses();
        if (businesses && businesses.length > 0) {
          setBusiness(businesses[0]);
          const unsubscribe = getAppointments(businesses[0].id, (data) => {
            setAppointments(data);
            setLoading(false);
          });
          return () => unsubscribe();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [refreshTrigger]);

  const totalRevenue = appointments.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const recentAppointments = [...appointments]
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
    .slice(0, 4);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Carregando...</div>;
  }

  if (!business) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <CreateBusiness onCreated={() => setRefreshTrigger(t => t + 1)} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Olá, {auth.currentUser?.displayName?.split(' ')[0] || 'João'}! 👋</h1>
          <p className="text-slate-500 mt-1">Aqui está o que está a acontecer no seu negócio hoje.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Calendar size={16} />
            {new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Novo Agendamento
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Receita Total" 
          value={`€ ${totalRevenue.toFixed(2)}`} 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
        />
        <StatCard 
          title="Agendamentos" 
          value={appointments.length.toString()} 
          change="+8.2%" 
          trend="up" 
          icon={Calendar} 
        />
        <StatCard 
          title="Novos Clientes" 
          value="42" 
          change="-2.4%" 
          trend="down" 
          icon={Users} 
        />
        <StatCard 
          title="Taxa de Ocupação" 
          value="78%" 
          change="+5.1%" 
          trend="up" 
          icon={TrendingUp} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Desempenho Semanal</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-semibold text-slate-600 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(value) => `€${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Próximos Agendamentos</h3>
          <div className="space-y-6">
            {recentAppointments.length > 0 ? recentAppointments.map((appointment, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                  <Clock size={20} className="text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">Cliente ID: {appointment.clientId.substring(0, 8)}</p>
                  <p className="text-xs text-slate-500 truncate">Serviço ID: {appointment.serviceId.substring(0, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">{appointment.startTime.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {appointment.status === 'confirmed' ? (
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    ) : (
                      <AlertCircle size={12} className="text-amber-500" />
                    )}
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      appointment.status === 'confirmed' ? "text-emerald-500" : "text-amber-500"
                    )}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-400">Sem agendamentos recentes.</div>
            )}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all">
            Ver Agenda Completa
          </button>
        </div>
      </div>
    </div>
  );
}
