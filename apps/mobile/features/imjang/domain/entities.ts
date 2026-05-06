export type ImjangStatus = 'planned' | 'visited' | 'hold';

export type ImjangPin = {
  id: string;
  title: string;
  address: string;
  status: ImjangStatus;
  rating: number;
  visitDateLabel: string;
  checklistSummary: string;
  latitude?: number;
  longitude?: number;
};
