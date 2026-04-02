import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Globe, Phone, Tag, ArrowRight } from 'lucide-react';
import { createBusiness } from '../services/firestoreService';
import { auth } from '../firebase';
import { BusinessCategory } from '../types';

export default function CreateBusiness({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('barbearia');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    try {
      await createBusiness({
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        category,
        ownerId: auth.currentUser.uid,
      });
      onCreated();
    } catch (error) {
      console.error("Error creating business:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/50"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-200">
          <Building2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Configure o seu Negócio</h2>
        <p className="text-slate-500 mt-2">Dê o primeiro passo para automatizar a sua agenda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Nome do Negócio</label>
          <div className="relative group">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Barbearia Lisboa"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Link Personalizado (Slug)</label>
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex: barbearia-lisboa"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
            />
          </div>
          <p className="text-[10px] text-slate-400 ml-1">O seu link será: sondié.pt/b/{slug || 'seu-link'}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Categoria</label>
          <div className="relative group">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as BusinessCategory)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all appearance-none"
            >
              <option value="barbearia">Barbearia</option>
              <option value="clinica">Clínica</option>
              <option value="estetica">Estética</option>
              <option value="nail_designer">Nail Designer</option>
              <option value="fisioterapia">Fisioterapia</option>
              <option value="oficina">Oficina</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {loading ? 'A criar...' : 'Criar Negócio'}
          {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
    </motion.div>
  );
}
