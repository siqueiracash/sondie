import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Overview from './dashboard/Overview';

// Placeholder components for other dashboard pages
const Agenda = () => <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex items-center justify-center text-slate-500 font-bold">Agenda (Em breve)</div>;
const Clientes = () => <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex items-center justify-center text-slate-500 font-bold">Gestão de Clientes (Em breve)</div>;
const Servicos = () => <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex items-center justify-center text-slate-500 font-bold">Gestão de Serviços (Em breve)</div>;
const Equipa = () => <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex items-center justify-center text-slate-500 font-bold">Gestão de Equipa (Em breve)</div>;
const Financeiro = () => <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex items-center justify-center text-slate-500 font-bold">Relatórios Financeiros (Em breve)</div>;
const Definicoes = () => <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex items-center justify-center text-slate-500 font-bold">Definições da Conta (Em breve)</div>;

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="servicos" element={<Servicos />} />
        <Route path="equipa" element={<Equipa />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="definicoes" element={<Definicoes />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
