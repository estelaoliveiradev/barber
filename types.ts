
export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  isCustomBlocked?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
}

export type AvailabilityMap = Record<string, string[]>; // dateIso -> array of blocked times

// ChatMessage interface for the AI Assistant component
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
