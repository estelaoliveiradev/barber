
import React, { useState, useMemo } from 'react';
import { BookingEngine } from '../services/bookingEngine';
import { Button } from './Button';

export const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const availableDays = useMemo(() => BookingEngine.getNextAvailableDays(14), []);
  const slots = useMemo(() => BookingEngine.generateAvailableSlots(selectedDate, true), [selectedDate, updateTrigger]);

  const handleToggle = (time: string) => {
    BookingEngine.toggleSlotAvailability(selectedDate, time);
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-[#111] rounded-xl border-2 border-[#d4af37] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="bg-[#d4af37] py-4 px-6 text-black flex justify-between items-center">
        <h2 className="text-xl font-bold uppercase tracking-widest italic">Painel de Controle - Verena</h2>
        <button onClick={onLogout} className="text-[10px] bg-black text-white px-3 py-1 rounded uppercase font-bold hover:bg-black/80">Sair</button>
      </div>

      <div className="p-6 space-y-8">
        <div className="bg-yellow-900/20 border border-yellow-700/30 p-4 rounded text-xs text-yellow-500 uppercase tracking-widest">
          Clique nos horários para <strong>bloquear</strong> ou <strong>liberar</strong> para os clientes.
        </div>

        <section>
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 block text-center">Selecionar Data de Gestão</label>
          <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
            {availableDays.map((date) => {
              const dateStr = date.toISOString().split('T')[0];
              const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
              const dayNum = date.getDate();
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex-shrink-0 w-14 h-16 flex flex-col items-center justify-center rounded border transition-all ${selectedDate === dateStr ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold' : 'border-white/10 text-gray-400'}`}
                >
                  <span className="text-[8px] uppercase opacity-70">{dayName}</span>
                  <span className="text-lg">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 block text-center">Horários do Dia</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map(slot => (
              <button
                key={slot.time}
                onClick={() => handleToggle(slot.time)}
                className={`py-3 text-xs rounded border transition-all flex flex-col items-center gap-1 ${slot.available ? 'border-green-900/50 bg-green-900/10 text-green-400 hover:bg-green-900/20' : 'border-red-900/50 bg-red-900/10 text-red-400 hover:bg-red-900/20'}`}
              >
                <span className="font-bold">{slot.time}</span>
                <span className="text-[8px] uppercase">{slot.available ? 'Livre' : 'Bloqueado'}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="pt-4 border-t border-white/5 text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest italic">As alterações são refletidas instantaneamente para os clientes</p>
        </div>
      </div>
    </div>
  );
};
