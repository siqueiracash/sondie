import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  Scissors, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  UserCircle,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { logout } from '../firebase';

const NavItem = ({ icon: Icon, label, path, active, collapsed }: { icon: any, label: string, path: string, active: boolean, collapsed: boolean }) => (
  <Link 
    to={path}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
    )}
  >
    <Icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "group-hover:text-indigo-600")} />
    {!collapsed && <span className="font-semibold whitespace-nowrap">{label}</span>}
  </Link>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleToggle = () => setMobileMenuOpen(prev => !prev);
    window.addEventListener('toggle-dashboard-menu', handleToggle);
    return () => window.removeEventListener('toggle-dashboard-menu', handleToggle);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
    { icon: Calendar, label: 'Agenda', path: '/dashboard/agenda' },
    { icon: Users, label: 'Clientes', path: '/dashboard/clientes' },
    { icon: Scissors, label: 'Serviços', path: '/dashboard/servicos' },
    { icon: Users, label: 'Equipa', path: '/dashboard/equipa' },
    { icon: TrendingUp, label: 'Financeiro', path: '/dashboard/financeiro' },
    { icon: Settings, label: 'Definições', path: '/dashboard/definicoes' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 sticky top-0 h-[calc(100vh-64px)]",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Calendar className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900">Sondié</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto">
              <Calendar className="text-white w-5 h-5" />
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {menuItems.map((item) => (
            <NavItem 
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
          >
            {collapsed ? <ChevronRight className="mx-auto" /> : <><ChevronLeft /> <span>Recolher</span></>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-1"
          >
            <LogOut className={cn("w-5 h-5", collapsed && "mx-auto")} />
            {!collapsed && <span className="font-semibold">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900">Sondié</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <X />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <NavItem 
                  key={item.path}
                  {...item}
                  active={location.pathname === item.path}
                  collapsed={false}
                />
              ))}
            </nav>
            <div className="p-4 border-t border-slate-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Sair</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
