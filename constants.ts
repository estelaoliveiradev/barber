
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Cabelo',
    duration: 45,
    price: 25.00,
    description: 'Corte moderno com acabamento impecável, utilizando tesoura e máquina.'
  },
  {
    id: '2',
    name: 'Cabelo e Barba',
    duration: 75,
    price: 40.00,
    description: 'O combo completo: cabelo alinhado e barba desenhada com técnica de toalha quente.'
  },
  {
    id: '3',
    name: 'Pezinho',
    duration: 15,
    price: 15.00,
    description: 'Manutenção rápida dos contornos do cabelo para manter o visual limpo.'
  },
  {
    id: '4',
    name: 'Sobrancelha',
    duration: 15,
    price: 10.00,
    description: 'Desenho e modelagem precisa da sobrancelha para um visual harmonioso.'
  }
];

// Horários específicos solicitados
export const BUSINESS_HOURS: Record<number, { open: string, close: string } | null> = {
  1: { open: '17:00', close: '21:00' }, // Segunda
  2: { open: '17:00', close: '21:00' }, // Terça
  3: { open: '17:00', close: '21:00' }, // Quarta
  4: { open: '17:00', close: '21:00' }, // Quinta
  5: { open: '17:00', close: '21:00' }, // Sexta
  6: { open: '09:00', close: '17:00' }, // Sábado
  0: null, // Domingo (Fechado)
};

export const SLOT_INTERVAL = 30; // em minutos

export const CONTACT_INFO = {
  phone: '(11) 99999-9999',
  address: 'Rua America, 274 - Centro',
  instagram: '@garagem274'
};
