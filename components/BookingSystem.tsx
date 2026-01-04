
import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES } from '../constants';
import { BookingEngine } from '../services/bookingEngine';
import { TimeSlot } from '../types';
import { Button } from './Button';

export const BookingSystem: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Gera os dias disponíveis uma vez
  const availableDays = useMemo(() => BookingEngine.getNextAvailableDays(14), []);
  
  // Slots de tempo para a data selecionada
  const slots = useMemo(() => BookingEngine.generateAvailableSlots(selectedDate), [selectedDate]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = BookingEngine.validateBooking(
      customerInfo.name, 
      customerInfo.phone, 
      selectedService, 
      selectedTime
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    const serviceName = SERVICES.find(s => s.id === selectedService)?.name;
    return (
      <div className="bg-[#1a1a1a] p-10 rounded-lg text-center border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-3xl font-bold mb-2 accent-gold uppercase">Reserva Confirmada!</h3>
        <p className="text-gray-400 mb-6 italic">
          {serviceName} agendado para o dia {selectedDate.split('-').reverse().join('/')} às {selectedTime}.
        </p>
        <Button onClick={() => setSuccess(false)}>Fazer outro agendamento</Button>
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-xl border border-white/5 overflow-hidden shadow-2xl">
      <div className="bg-[#d4af37] py-4 px-6 text-black">
        <h2 className="text-xl font-bold uppercase tracking-widest text-center italic">Calendário de Agendamento</h2>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* 1. Seleção de Serviço */}
        <section>
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 block">1. Escolha o Serviço</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SERVICES.map(service => (
              <button 
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-3 text-left border rounded transition-all ${selectedService === service.id ? 'border-[#d4af37] bg-[#d4af37]/5 ring-1 ring-[#d4af37]' : 'border-white/10 hover:border-white/20'}`}
              >
                <p className="text-sm font-bold uppercase mb-1">{service.name}</p>
                <p className="text-xs accent-gold">R$ {service.price.toFixed(0)}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Calendário de Dias */}
        <section>
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 block">2. Selecione o Dia</label>
          <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
            {availableDays.map((date) => {
              const dateStr = date.toISOString().split('T')[0];
              const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
              const dayNum = date.getDate();
              const month = date.toLocaleDateString('pt-BR', { month: 'short' });

              return (
                <button
                  key={dateStr}
                  onClick={() => { setSelectedDate(dateStr); setSelectedTime(''); }}
                  className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-lg border transition-all ${selectedDate === dateStr ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                >
                  <span className="text-[10px] uppercase opacity-70">{dayName}</span>
                  <span className="text-xl">{dayNum}</span>
                  <span className="text-[10px] uppercase opacity-70">{month}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Horários */}
        <section>
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 block">3. Horários Disponíveis</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {slots.map(slot => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`py-2 text-xs rounded border transition-all ${selectedTime === slot.time ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]' : slot.available ? 'border-white/10 text-gray-300 hover:border-white/40' : 'opacity-20 text-gray-600 border-transparent cursor-not-allowed'}`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Dados Finais */}
        <form onSubmit={handleBooking} className="pt-6 border-t border-white/5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text"
              placeholder="Seu Nome"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              className="bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-[#d4af37] outline-none transition-colors"
            />
            <input 
              type="tel"
              placeholder="Seu WhatsApp"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              className="bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-[#d4af37] outline-none transition-colors"
            />
          </div>
          
          {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>}
          
          <Button 
            fullWidth 
            type="submit" 
            disabled={!selectedTime || !selectedService}
          >
            Confirmar para {selectedTime}
          </Button>
          <p className="text-[9px] text-gray-600 text-center uppercase tracking-widest">A confirmação será enviada via WhatsApp</p>
        </form>
      </div>
    </div>
  );
};
