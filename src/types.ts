export type Business = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  category: BusinessCategory;
  ownerId: string;
  createdAt: Date;
};

export type BusinessCategory = 
  | 'clinica'
  | 'barbearia'
  | 'estetica'
  | 'nail_designer'
  | 'depilacao'
  | 'fisioterapia'
  | 'personal_trainer'
  | 'oficina'
  | 'outro';

export type Service = {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  duration: number; // in minutes
  price: number;
  isActive: boolean;
};

export type Employee = {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone?: string;
  commission: number; // percentage
  isActive: boolean;
  services: string[]; // IDs of services they can perform
};

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

export type Appointment = {
  id: string;
  businessId: string;
  serviceId: string;
  employeeId: string;
  clientId: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  totalPrice: number;
  notes?: string;
  createdAt: Date;
};

export type Client = {
  id: string;
  businessId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export type WorkingHours = {
  dayOfWeek: number; // 0-6
  isOpen: boolean;
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
  breaks: {
    startTime: string;
    endTime: string;
  }[];
};
