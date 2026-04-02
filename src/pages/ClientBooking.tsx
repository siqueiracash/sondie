import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Info,
  ArrowRight
} from 'lucide-react';
import { format, addDays, startOfToday, isSameDay, addMinutes } from 'date-fns';
import { pt } from 'date-fns/locale';
import { cn } from '@/src/lib/utils';
import { getBusinessBySlug, getServices, getEmployees, createClient, createAppointment } from '../services/firestoreService';
import { Business, Service, Employee } from '../types';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export default function ClientBooking() {
  const { slug } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      try {
        const biz = await getBusinessBySlug(slug);
        if (biz) {
          setBusiness(biz);
          const [srvs, emps] = await Promise.all([
            getServices(biz.id),
            getEmployees(biz.id)
          ]);
          setServices(srvs || []);
          setEmployees(emps || []);
        }
      } catch (error) {
        console.error("Error loading booking data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleConfirmBooking = async () => {
    if (!business || !selectedService || !selectedEmployee || !selectedTime) return;
    
    setBookingLoading(true);
    try {
      // 1. Create or get client
      const clientId = await createClient(business.id, {
        businessId: business.id,
        name: clientInfo.name,
        email: clientInfo.email,
        phone: clientInfo.phone
      });

      if (!clientId) throw new Error("Failed to create client");

      // 2. Create appointment
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);
      const endTime = addMinutes(startTime, selectedService.duration);

      await createAppointment(business.id, {
        businessId: business.id,
        serviceId: selectedService.id,
        employeeId: selectedEmployee.id,
        clientId: clientId,
        startTime,
        endTime,
        status: 'pending',
        totalPrice: selectedService.price,
        notes: ''
      });

      setStep(5);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Ocorreu um erro ao confirmar o agendamento. Por favor, tente novamente.");
    } finally {
      setBookingLoading(false);
    }
  };

  const days = Array.from({ length: 14 }).map((_, i) => addDays(startOfToday(), i));

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!business) return <div className="min-h-screen flex items-center justify-center">Negócio não encontrado.</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <main className="max-w-3xl mx-auto px-4 pt-8">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                step >= i ? "bg-indigo-600" : "bg-slate-200"
              )} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-900">Escolha o serviço</h2>
              <div className="grid gap-4">
                {services.length > 0 ? services.map((service) => (
                  <button 
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      nextStep();
                    }}
                    className={cn(
                      "flex items-center justify-between p-6 bg-white rounded-2xl border-2 transition-all text-left group",
                      selectedService?.id === service.id ? "border-indigo-600 bg-indigo-50/30" : "border-transparent hover:border-slate-200"
                    )}
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{service.duration} min • €{service.price}</p>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                )) : (
                  <div className="text-center py-12 text-slate-500">Este negócio ainda não tem serviços disponíveis.</div>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <button onClick={prevStep} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full transition-colors">
                  <ChevronLeft />
                </button>
                <h2 className="text-2xl font-bold text-slate-900">Com quem?</h2>
              </div>
              <div className="grid gap-4">
                {employees.length > 0 ? employees.map((employee) => (
                  <button 
                    key={employee.id}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      nextStep();
                    }}
                    className={cn(
                      "flex items-center gap-4 p-6 bg-white rounded-2xl border-2 transition-all text-left group",
                      selectedEmployee?.id === employee.id ? "border-indigo-600 bg-indigo-50/30" : "border-transparent hover:border-slate-200"
                    )}
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <User size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{employee.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">Profissional</p>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                )) : (
                  <div className="text-center py-12 text-slate-500">Este negócio ainda não tem funcionários registados.</div>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={prevStep} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full transition-colors">
                  <ChevronLeft />
                </button>
                <h2 className="text-2xl font-bold text-slate-900">Quando?</h2>
              </div>

              {/* Date Selection */}
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {days.map((date) => (
                  <button 
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "flex flex-col items-center min-w-[70px] p-4 rounded-2xl border-2 transition-all",
                      isSameDay(selectedDate, date) ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "border-transparent bg-white text-slate-600 hover:border-slate-200"
                    )}
                  >
                    <span className="text-xs font-bold uppercase mb-1">{format(date, 'EEE', { locale: pt })}</span>
                    <span className="text-lg font-bold">{format(date, 'd')}</span>
                  </button>
                ))}
              </div>

              {/* Time Selection */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-600" />
                  Horários Disponíveis
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button 
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        nextStep();
                      }}
                      className={cn(
                        "py-3 rounded-xl border-2 font-bold transition-all",
                        selectedTime === time ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-transparent bg-white text-slate-600 hover:border-slate-200"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <button onClick={prevStep} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full transition-colors">
                  <ChevronLeft />
                </button>
                <h2 className="text-2xl font-bold text-slate-900">Confirmar Agendamento</h2>
              </div>

              {/* Summary Card */}
              <div className="bg-indigo-600 text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Calendar size={120} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-indigo-100 text-sm font-medium mb-1">Serviço</p>
                      <h3 className="text-xl font-bold">{selectedService?.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-indigo-100 text-sm font-medium mb-1">Preço</p>
                      <h3 className="text-xl font-bold">€{selectedService?.price}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-indigo-100 text-sm font-medium mb-1">Data e Hora</p>
                      <p className="font-bold">{format(selectedDate, "d 'de' MMMM", { locale: pt })} às {selectedTime}</p>
                    </div>
                    <div>
                      <p className="text-indigo-100 text-sm font-medium mb-1">Profissional</p>
                      <p className="font-bold">{selectedEmployee?.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">O seu nome</label>
                  <input 
                    type="text" 
                    placeholder="Nome completo"
                    className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="seu@email.com"
                      className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Telemóvel</label>
                    <input 
                      type="tel" 
                      placeholder="9xx xxx xxx"
                      className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConfirmBooking}
                disabled={bookingLoading || !clientInfo.name || !clientInfo.phone}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {bookingLoading ? 'A confirmar...' : 'Confirmar Agendamento'}
                {!bookingLoading && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Agendamento Confirmado!</h2>
              <p className="text-slate-600 max-w-sm mx-auto">
                Tudo pronto, {clientInfo.name.split(' ')[0]}! Receberá um lembrete no seu telemóvel 2 horas antes do serviço.
              </p>
              <div className="pt-8 space-y-4">
                <button className="w-full bg-white text-slate-700 border-2 border-slate-200 py-4 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">
                  Adicionar ao Calendário
                </button>
                <button onClick={() => setStep(1)} className="text-indigo-600 font-bold hover:underline">
                  Fazer outro agendamento
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
