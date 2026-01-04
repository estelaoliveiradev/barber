
import { TimeSlot, AvailabilityMap } from '../types';
import { BUSINESS_HOURS, SLOT_INTERVAL } from '../constants';

const STORAGE_KEY = 'garagem_availability_overrides';

export class BookingEngine {
  private static getOverrides(): AvailabilityMap {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  static toggleSlotAvailability(dateIso: string, time: string): void {
    const overrides = this.getOverrides();
    if (!overrides[dateIso]) overrides[dateIso] = [];
    
    const index = overrides[dateIso].indexOf(time);
    if (index > -1) {
      overrides[dateIso].splice(index, 1);
    } else {
      overrides[dateIso].push(time);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  }

  static getNextAvailableDays(daysCount: number = 21): Date[] {
    const days: Date[] = [];
    let checkDate = new Date();
    
    while (days.length < daysCount) {
      const dayOfWeek = checkDate.getDay();
      if (BUSINESS_HOURS[dayOfWeek] !== null) {
        days.push(new Date(checkDate));
      }
      checkDate.setDate(checkDate.getDate() + 1);
    }
    return days;
  }

  static generateAvailableSlots(dateIso: string, isAdmin: boolean = false): TimeSlot[] {
    const date = new Date(dateIso + 'T12:00:00');
    const dayOfWeek = date.getDay();
    const hours = BUSINESS_HOURS[dayOfWeek];
    const overrides = this.getOverrides();
    const blockedTimes = overrides[dateIso] || [];

    if (!hours) return [];

    const slots: TimeSlot[] = [];
    const [openH, openM] = hours.open.split(':').map(Number);
    const [closeH, closeM] = hours.close.split(':').map(Number);

    const currentSlot = new Date(dateIso + 'T00:00:00');
    currentSlot.setHours(openH, openM, 0, 0);
    const endSlot = new Date(dateIso + 'T00:00:00');
    endSlot.setHours(closeH, closeM, 0, 0);

    const now = new Date();
    const isToday = dateIso === now.toISOString().split('T')[0];

    while (currentSlot < endSlot) {
      const timeStr = currentSlot.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const isPast = isToday && currentSlot <= now;
      const isManuallyBlocked = blockedTimes.includes(timeStr);
      
      slots.push({
        time: timeStr,
        available: !isPast && !isManuallyBlocked,
        isCustomBlocked: isManuallyBlocked
      });
      
      currentSlot.setMinutes(currentSlot.getMinutes() + SLOT_INTERVAL);
    }

    return slots;
  }

  static validateBooking(name: string, phone: string, serviceId: string, time: string): string | null {
    if (!serviceId) return "Selecione um serviço primeiro.";
    if (!time) return "Escolha um horário no calendário.";
    if (!name || name.length < 3) return "Informe seu nome para a reserva.";
    if (!phone || phone.length < 10) return "Informe um telefone válido.";
    return null;
  }
}
